from flask import Flask, jsonify, request
import pandas as pd
import openai
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask
app = Flask(__name__)

# Initialize OpenAI API
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

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
    alert_id = request.args.get('alertID')
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

if __name__ == '__main__':
    app.run(debug=True)
