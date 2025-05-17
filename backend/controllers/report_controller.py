from flask import Blueprint, request, jsonify, send_file
import pandas as pd
from utils.report_generator import generate_report
import os
from werkzeug.utils import secure_filename

report_bp = Blueprint('report', __name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@report_bp.route('/upload_csv', methods=['POST'])
def upload_csv():
    try:
        # File get karo from form-data
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        # CSV ko DataFrame mein load karo
        df = pd.read_csv(file_path)

        # Report generate karo
        pdf_path = generate_report(df)

        # Send the PDF to frontend
        return send_file(pdf_path, as_attachment=True)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500
