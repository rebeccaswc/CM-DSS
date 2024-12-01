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
import uuid
from urllib.parse import quote_plus
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from langchain.llms import OpenAI
from langchain import PromptTemplate, LLMChain

# Load environment variables from .env
load_dotenv()

# Ensure the directory exists
os.makedirs('temp_images', exist_ok=True)

# Initialize Flask
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# Temporary conversation context 
conversation_contexts = {}

# Initialize OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize MongoDB 
username = os.getenv('MONGO_USERNAME')
password = os.getenv('MONGO_PASSWORD')
cluster = os.getenv('MONGO_CLUSTER')
database = os.getenv('MONGO_DATABASE')
log_database = os.getenv('LOG_DATABASE')

def get_mongo_client(username, password, cluster, database):
    encoded_password = quote_plus(password)
    uri = f'mongodb+srv://{username}:{encoded_password}@{cluster}/{database}?retryWrites=true&w=majority&appName=UserDB'
    return pymongo.MongoClient(uri, tlsCAFile=certifi.where())

# Connect to USER_DB
user_client = get_mongo_client(username, password, cluster, database)
user_db = user_client[database]
user_collection = user_db['user']

# Connect to LOG_DB
log_client = get_mongo_client(username, password, cluster, log_database)
log_db = log_client[log_database]
log_collection = log_db['log']

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

# Encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

# Extract OCR text
def extract_ocr_text(image_path):
    image = Image.open(image_path)
    return pytesseract.image_to_string(image)

# Gen Image Analysis docu.
def process_image(image_path):
    # OCR text extraction
    ocr_text = extract_ocr_text(image_path)
    
    # Encode the image for GPT-4o-mini
    base64_image = encode_image(image_path)
    
    # Use GPT-4o-mini vision
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a cybersecurity professional specializing in network architecture assessment."},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Analyze the network architecture diagram in this image. "
                            "Use the following format to describe the diagram: "
                            "1. Network Zone Division, 2. IP Addressing Scheme, 3. Devices in Each Zone, "
                            "4. Connections Within a Zone, 5. Connections Between Zones, and "
                            "6. Supplementary Information on traffic flow or security mechanisms."
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
    )
    
    # image analysis result
    image_analysis_response = response.choices[0].message["content"]
    # combined_ocr_and_gpt_image_analysis = (
    #     f"### OCR Text Extracted:\n{ocr_text}\n\n"
    #     f"### Image Analysis:\n{image_analysis_response}\n\n"
    #     f"### Combined Insights:\n"
    #     f"Analyze the above OCR and Image details to create a detailed description of the network architecture diagram as requested."
    # )
    
    # return combined_ocr_and_gpt_image_analysis
    return image_analysis_response


def generate_threat_report(alert_ID, rule_description, source_ip, mitre_attack_technique, rule_id, fired_times, severity_level, timestamp, image_analysis):
    
    threat_name = f"Incident Report for Rule ID: {rule_id}"
    date = timestamp
    impact = f"Severity Level: {severity_level}, Fired Times: {fired_times}"
    key_points = f"Rule Description: {rule_description}, Source IP: {source_ip}, MITRE ATT&CK Techniques: {mitre_attack_technique}"
    
    # Default recommendations (can be overridden later based on image analysis)
    recommendations = [
        "Review and update authentication mechanisms.",
        "Enhance monitoring for abnormal login attempts."
    ]

    # Start building the report
    prompt = f"""
    # Threat Report
    ## Overview
    - **Alert ID:** {alert_ID}
    - **Threat Name:** {threat_name}
    - **Date of Occurrence:** {date}
    - **Impact:** {impact}

    ## Key Points
    {key_points}
    """

    # if image analysis is provided that add Comprehensive Analysis 
    if image_analysis:
        prompt += f"""
        ## Comprehensive Analysis:
        Based on the alert data and the analysis of the network architecture image, the following observations are made:
        - The rule '{rule_description}' triggered an alert due to activity from source IP {source_ip}, indicating potential malicious behavior.
        - {image_analysis}

        ## Mitigation Recommendations Based on Image Analysis:
        Based on the analysis of the network architecture, the following mitigation steps are recommended:
        - *Recommendation 1*: Implement network segmentation to isolate critical systems.
        - *Recommendation 2*: Enhance logging and monitoring for specific devices identified in the architecture.
        """

    # if no image analysis that add standard Mitigation Recommendations 
    if not image_analysis:
        prompt += f"""
        ## Mitigation Recommendations:
        - *Mitigation recommendation 1*: {recommendations[0]}
        - *Mitigation recommendation 2*: {recommendations[1]}
        """

    # Add Conclusion
    prompt += """
    ## Conclusion:
    Based on the comprehensive analysis and mitigation recommendations, we suggest immediate action to address the identified threat and minimize the risk of future incidents.
    """

    # Return the final response from ChatGPT (or any other relevant model)
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
        data = request.form.to_dict()
        user_message = data.get("message")
        alert_id = request.args.get('alert_id') or data.get('alert_id')
        session_id = data.get("session_id") or str(uuid.uuid4())

        # Get the image from the uploaded file
        image = request.files.get("file")

        # Validate inputs
        if not alert_id:
            return jsonify({"error": "Either alert_id is missing"}), 400

        if image:
            # Save the image to a temporary file
            image_filename = secure_filename(image.filename)
            image_path = os.path.join("temp_images", image_filename)
            image.save(image_path)
        else:
            image_path = None

        # Init conversation contexts
        if session_id not in conversation_contexts:
            conversation_contexts[session_id] = []

        # Init response content
        report, image_result, response_message = None, None, None

        # alert id processing
        if alert_id:
            filepath = 'data/log_data.csv'
            row_data = read_row_from_csv_by_alert_id(filepath, alert_id)
            if row_data is None:
                return jsonify({"error": "Alert not found"}), 404

            rule_description = row_data['Rule Description']
            source_ip = row_data['Source IP']
            mitre_attack_technique = row_data['MITRE ATT&CK Technique']
            rule_id = row_data['Rule ID']
            fired_times = row_data['Fired Times']
            severity_level = row_data['Severity Level']
            timestamp = row_data['Timestamp']

            # Process image if provided
            if image_path:
                image_result = process_image(image_path)
                if not image_result:
                    return jsonify({"error": "Failed to process image"}), 500
                # Gen report with image analysis
                report = generate_threat_report(
                    alert_id,
                    rule_description,
                    source_ip,
                    mitre_attack_technique,
                    rule_id,
                    fired_times,
                    severity_level,
                    timestamp,
                    image_result
                )
                conversation_contexts[session_id].append(f"### Image Analysis:\n{image_result}")
            else:
                # Gen report without image analysis
                report = generate_threat_report(
                    alert_id,
                    rule_description,
                    source_ip,
                    mitre_attack_technique,
                    rule_id,
                    fired_times,
                    severity_level,
                    timestamp,
                    image_analysis=None
                )
            conversation_contexts[session_id].append(f"### Alert Report:\n{report}")

        # User message processing
        if user_message:
            conversation_contexts[session_id].append(f"### User Question:\n{user_message}")
            combined_prompt = "\n\n".join(conversation_contexts[session_id])
            response_message = get_chat_gpt_response(combined_prompt)
            conversation_contexts[session_id].append(f"### System Response:\n{response_message}")

        # Final response
        final_response = {
            "alert_report": report,
            "chat_response": response_message,
        }
        return jsonify(final_response)

    except Exception as e:
        print(f"Error in /chat endpoint: {traceback.format_exc()} : {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/info/amount', methods=['GET'])
def get_alert_amount():
    filepath = "./data/log_data.csv"
    df = pd.read_csv(filepath)
    alert_amount = len(df)
    return jsonify(alert_amount)

@app.route('/info/level', methods=['GET'])
def get_alert_security_level_amount():
    filepath = "./data/log_data.csv"
    df = pd.read_csv(filepath)
    alert_level_amount = df['Severity Level'].astype(str).value_counts().to_dict()
    return jsonify(alert_level_amount)

@app.route('/info/technique', methods=['GET'])
def get_alert_technique_amount():
    filepath = "./data/log_data.csv"
    df = pd.read_csv(filepath)
    alert_technique_amount = df['MITRE ATT&CK Technique'].astype(str).value_counts().to_dict()
    return jsonify(alert_technique_amount)

@app.route('/info/timestamp', methods=['GET'])
def get_alert_timestamp_amount():
    filepath = "./data/log_data.csv"
    df = pd.read_csv(filepath)
    alert_technique_amount = df['Timestamp'].astype(str).value_counts().to_dict()
    return jsonify(alert_technique_amount)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message":"Missing email or password"}) , 400
        
        if user_collection.find_one({"email": email}):
            return jsonify({"message": "Email already exists"})  ,409

        hasehd_password = generate_password_hash(password)
        user_collection.insert_one({"email":email,"password":hasehd_password})

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
        
        user = user_collection.find_one({"email": email})
        
        if user and check_password_hash(user["password"], password):
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            # response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True, samesite='None')
            return jsonify({
                "access_token": access_token,
                "refresh_token": refresh_token
            }), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify({"message": traceback.format_exc()}), 500
    

@app.route('/change-password', methods=['POST'])
def change_password():
    try:
        data = request.get_json()
        email = data.get("email")
        current_password = data.get("current_password")
        new_password = data.get("new_password")
        user = user_collection.find_one({"email": email})

        if not user:
            return jsonify({"message": "User not found"}), 404

        if not check_password_hash(user["password"], current_password):
            return jsonify({"message": "Current password is incorrect"}), 401

        # update password
        hashed_password = generate_password_hash(new_password)
        user_collection.update_one({"email": email}, {"$set": {"password": hashed_password}})

        return jsonify({"message": "Password updated successfully"}), 200

    except pymongo.errors.PyMongoError as e:
        print(f"MongoDB error: {traceback.format_exc()} : {e}")
        return jsonify({"message": "Error updating password"}), 500
    
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