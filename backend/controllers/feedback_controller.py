from flask import Blueprint, request, jsonify
import mysql.connector
from mysql.connector import Error

feedback_bp = Blueprint('feedback', __name__)

# MySQL configuration
@feedback_bp.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not email or not message:
        return jsonify({'error': 'Email and message are required.'}), 400

    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",  # ✅ correct this
            password="",  # ✅ correct this
            database="data_streamliner"
        )

        if connection.is_connected():
            cursor = connection.cursor()
            sql = "INSERT INTO feedback (name, email, message) VALUES (%s, %s, %s)"
            values = (name, email, message)
            cursor.execute(sql, values)
            connection.commit()
            cursor.close()
            connection.close()
            return jsonify({'message': 'Feedback submitted successfully.'}), 200
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({'error': 'Database connection failed.'}), 500

