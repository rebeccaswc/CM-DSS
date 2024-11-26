from PIL import Image
import base64
import io
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
import pytesseract
import traceback
from urllib.parse import quote_plus
from werkzeug.security import generate_password_hash, check_password_hash
from langchain.llms import OpenAI
from langchain import PromptTemplate, LLMChain

# Load environment variables from .env
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

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

def process_image(image_path):
    """
    Processes an image, extracts meaningful information (metadata + OCR text),
    and queries GPT for analysis.
    """
    try:
        # Open the image file
        pil_image = Image.open(image_path)

        # Extract image metadata
        metadata = {
            "format": pil_image.format,
            "size": pil_image.size,
            "mode": pil_image.mode
        }

        # Perform OCR to extract text from the images
        ocr_text = pytesseract.image_to_string(pil_image)

        prompt = (
            f"The image has the following metadata: {metadata}. "
            f"The text extracted from the image using OCR is: {ocr_text.strip()}. "
            "Analyze this information network architecture or security implications."
        )

        # Query GPT
        return get_chat_gpt_response(prompt) or "Image processed successfully, but no detailed result returned."
    except Exception as e:
        print(f"Error processing image: {traceback.format_exc()}")
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


@app.route('/alert', methods=['GET'])
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


@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Extract data from the request
        data = request.form.to_dict()
        user_message = data.get("message")
        alert_id = data.get("alert_id")
        image = request.files.get("file")

        # Validate inputs
        if not user_message and not alert_id or not image:
            return jsonify({"error": "At least one of message, alert_id, or image is required"}), 400

        # Initialize response content
        responses = []

        # Process image if provided
        if image:
            try:
                image_result = process_image(image)
                if not image_result:
                    return jsonify({"error": "Failed to process image"}), 500
                responses.append({"image_analysis": image_result})
            except Exception as e:
                return jsonify({"error": f"Error processing file: {str(e)}"}), 500

        # Process alert ID if provided
        if alert_id:
            try:
                filepath = 'data/log_data.csv'
                row_data = read_row_from_csv_by_alert_id(filepath, alert_id)
                if not row_data:
                    return jsonify({"error": "Alert not found"}), 404

                # Generate threat report
                report = generate_threat_report(
                    alert_id,
                    row_data.get('Rule Description'),
                    row_data.get('Source IP'),
                    row_data.get('MITRE ATT&CK Technique'),
                    row_data.get('Rule ID'),
                    row_data.get('Fired Times'),
                    row_data.get('Severity Level'),
                    row_data.get('Timestamp')
                )
                responses.append({"threat_report": report})
            except Exception as e:
                return jsonify({"error": f"Error processing alert ID: {str(e)}"}), 500

        # Process user message if provided
        if user_message:
            try:
                response_message = get_chat_gpt_response(user_message)
                responses.append({"chat_response": response_message})
            except Exception as e:
                return jsonify({"error": f"Error processing message: {str(e)}"}), 500

        # Combine all responses
        return jsonify({"responses": responses})

    except Exception as e:
        print(f"Error in /chat endpoint: {traceback.format_exc()} : {e}")
        return jsonify({"error": "An error occurred while processing the request"}), 500


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

@app.route("/login", methods=["POST"])
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
            response = jsonify({"message": "Sign in successfully!"})
            response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True, samesite='None')
            return response, 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify({"message": traceback.format_exc()}), 500
    
@app.route('/protected', methods=['GET', 'POST'])
@jwt_required()
def protected(): 
    return jsonify(msg='ok')

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    ret = {
        'access_token': create_access_token(identity=identity)
    }
    return jsonify(ret), 200

if __name__ == '__main__':
    app.run(debug=True, port=3000)
