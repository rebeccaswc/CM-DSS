from flask import Flask, jsonify, request , make_response
import pandas as pd
import openai
from openai import OpenAI
import os , time
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, make_response, request, jsonify
import jwt
import pymongo
import certifi
import traceback
from urllib.parse import quote_plus
from flask_jwt_extended import (
    JWTManager, create_access_token, get_csrf_token, 
    jwt_required, get_jwt_identity, set_access_cookies, 
    verify_jwt_in_request
)
from werkzeug.security import generate_password_hash, check_password_hash

# Load environment variables from .env
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Initialize OpenAI API
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# Initialize MongoDB 
username = os.getenv('MONGO_USERNAME')
password = os.getenv('MONGO_PASSWORD')
cluster = os.getenv('MONGO_CLUSTER')
database = os.getenv('MONGO_DATABASE')
encoded_password = quote_plus(password)

# MongoDB Connection
uri = f'mongodb+srv://{username}:{encoded_password}@{cluster}/{database}?retryWrites=true&w=majority&appName=UserDB'
client = pymongo.MongoClient(
    uri,
    tlsCAFile=certifi.where()
)
db = client[database]
collection = db['user']

# Initialize JWT
app.config.update({
    'JWT_TOKEN_LOCATION': ['cookies'],
    'JWT_SECRET_KEY': os.getenv('JWT_SECRET_KEY'),
    'JWT_COOKIE_SECURE': True, 
    'ACCESS_TOKEN_SECRET_KEY': os.getenv('ACCESS_TOKEN_SECRET_KEY'),
    'REFRESH_TOKEN_SECRET_KEY': os.getenv('REFRESH_TOKEN_SECRET_KEY')
})
jwt_manager = JWTManager(app)


def open_file(filepath):
    with open(filepath, 'r', encoding='UTF-8') as file:
        return file.read()

def read_row_from_csv_by_alert_id(filepath, alert_id):
    df = pd.read_csv(filepath)
    df['alertID'] = df['alertID'].astype(str)
    filtered_df = df[df['alertID'] == str(alert_id)]
    
    if not filtered_df.empty:
        return filtered_df.iloc[0]
    else:
        return None
    
@app.route('/alert', methods=['GET'])
def get_all_alert():
    filepath = 'data/log_data.csv'
    row_data = pd.read_csv(filepath)
    alerts = []

    sort_by = request.args.get('sort')
    print(f"Data is sort by: {sort_by}")  # Debug line

    if sort_by and sort_by in row_data.columns:
        row_data = row_data.sort_values(by=sort_by)

    for index, row in row_data.head(9).iterrows():
        alert = {
            'number': row['alertID'],
            'alertID': row['alertID'],
            'ip': row['Source IP'],
            'level': row['Severity Level'],
            'alertDate': row['Timestamp']
        }
        alerts.append(alert)

    return jsonify(alerts)


def get_chat_gpt_response(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a cybersecurity professional specializing in vulnerability assessment."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.2
    )
    return response.choices[0].message.content.strip()

def generate_threat_report(alert_ID, rule_description, source_ip, mitre_attack_technique, rule_id, fired_times, severity_level, timestamp):
    
    threat_name = f"Incident Report for Rule ID: {rule_id}"
    date = timestamp
    industries = "All Industries"
    impact = f"Severity Level: {severity_level}, Fired Times: {fired_times}"
    key_points = f"Rule Description: {rule_description}, Source IP: {source_ip}, MITRE ATT&CK Techniques: {mitre_attack_technique}"
    recommendations = [
        "Review and update authentication mechanisms.",
        "Enhance monitoring for abnormal login attempts."
    ]

    prompt = f"""
    # Threat Report
    ## Overview
    - **Alert ID:** {alert_ID}
    - **Threat Name:** {threat_name}
    - **Date of Occurrence:** {date}
    - **Industries Affected:** {industries}
    - **Impact:** {impact}

    ## Key Point
    {key_points}

    ## Mitigation Recommendations
    - *Mitigation recommendation 1*: {recommendations[0]}
    - *Mitigation recommendation 2*: {recommendations[1]}
    """
    return get_chat_gpt_response(prompt)


@app.route('/solution', methods=['GET'])
def get_solution():
    alert_id = request.args.get('index')
    print(f"Received alertID: {alert_id}")  # Debug line

    if not alert_id:
        return jsonify({"error": "Alert ID is required"}), 400

    filepath = 'data/log_data.csv'
    row_data = read_row_from_csv_by_alert_id(filepath, alert_id)

    if row_data is None:
        print(f"No data found for alertID: {alert_id}")  # Debug line
        return jsonify({"error": "Alert not found"}), 404

    rule_description = row_data['Rule Description']
    source_ip = row_data['Source IP']
    mitre_attack_technique = row_data['MITRE ATT&CK Technique']
    rule_id = row_data['Rule ID']
    fired_times = row_data['Fired Times']
    severity_level = row_data['Severity Level']
    timestamp = row_data['Timestamp']

    report = generate_threat_report(alert_id, rule_description, source_ip, mitre_attack_technique, rule_id, fired_times, severity_level, timestamp)

    return jsonify({
        "alertID": alert_id,
        "report": report
    })

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message":"Missing email or password"}) , 400
        
        if collection.find_one({"email": email}):
            return jsonify({"message": "Email already exists"})  ,409

        hasehd_password = generate_password_hash(password)
        collection.insert_one({"email":email,"password":hasehd_password})

        return jsonify(message="User registered successfully created") , 201
    
    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify(message="Error connecting to MongoDB"), 500

@app.route("/login",methods=["POST"])
def signin():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
                return jsonify({"message":"Missing email or password"}) , 400
        
        user = collection.find_one({"email":email})
        
        if user and check_password_hash(user["password"],password):
                access_token = create_access_token(identity={"email" : email})
                # csrf_token = get_csrf_token(access_token)
                response = jsonify({"message":"Sign in successfully!"})
                response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True,samesite='None')
                # response.set_cookie('csrf_access_token', value=csrf_token, httponly=True,secure=True, samesite='Strict')
                return response, 200
        else:
             return jsonify({"message": "Invalid email or password"}), 401

    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify({"message": traceback.format_exc()}), 500


if __name__ == '__main__':
    app.run(debug=True)
