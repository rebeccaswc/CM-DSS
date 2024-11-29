from flask import Flask, jsonify, request , make_response
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_required, create_refresh_token,get_jwt_identity
)
import datetime
import pandas as pd
import openai
import os
from dotenv import load_dotenv
from flask_cors import CORS
import pymongo
import certifi
import traceback
from urllib.parse import quote_plus
from werkzeug.security import generate_password_hash, check_password_hash

# Load environment variables from .env
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "https://cm-dss-front-end.onrender.com"}})

# Initialize OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

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

# Initialize jwt token
jwt = JWTManager()
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'default-secret-key')
app.config['JWT_QUERY_STRING_NAME'] = 'jwt'
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string', 'cookies']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 15)))
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = datetime.timedelta(minutes=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 1440)))
jwt.init_app(app)


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

def get_chat_gpt_response(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a cybersecurity professional specializing in vulnerability assessment."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=750,
            temperature=0.2
        )   
        return response.choices[0].message['content'].strip()
    
    except Exception as e:
        print(f"Error in GPT response: {traceback.format_exc()} : {e}")
        return None


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


@app.route('/api/alert', methods=['GET'])
def get_all_alert():
    filepath = 'data/log_data.csv'
    row_data = pd.read_csv(filepath)
    alerts = []

    sort_by = request.args.get('sort')
    print(f"Data is sort by: {sort_by}")  # Debug line

    if sort_by and sort_by in row_data.columns:
        row_data = row_data.sort_values(by=sort_by)

    for index, row in row_data.iterrows():
        alert = {
            'number': row['alertID'],
            'alertID': row['alertID'],
            'ip': row['Source IP'],
            'level': row['Severity Level'],
            'alertDate': row['Timestamp']
        }
        alerts.append(alert)

    return jsonify(alerts)

@app.route('/api/solution', methods=['GET'])
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


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message")

        if not user_message:
            return jsonify({"error": "Message is required"}), 400 
    
        response_message = get_chat_gpt_response(user_message)
        return jsonify({"response": response_message})

    except Exception as e:
        print(f"Error in /chat endpoint: {traceback.format_exc()} : {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500


@app.route('/api/signup', methods=['POST'])
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

@app.route("/api/login", methods=["POST"])
def signin():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Missing email or password"}), 400
        
        user = collection.find_one({"email": email})
        
        if user and check_password_hash(user["password"], password):
            access_token = create_access_token(identity=email)
            print(access_token)
            response = make_response(jsonify({"message": "Cookie has been set"}))

            response = jsonify({"message": "Sign in successfully!"})
            response.set_cookie('access_token_cookie', value=access_token,secure=True, samesite='None',path='/',domain= "onrender.com")
            return response, 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify({"message": traceback.format_exc()}), 500
    
@app.route('/api/protected', methods=['GET', 'POST'])
@jwt_required()
def protected(): 
    return jsonify(msg='ok')

@app.route('/api/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=identity)
    }
    return jsonify(ret), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)