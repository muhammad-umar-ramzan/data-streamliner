from flask import Blueprint, send_file, jsonify, request
import os

download_bp = Blueprint('download_bp', __name__)

SAVED_MODELS_DIR = 'saved_models'
CLEANED_DATA_DIR = 'cleaned_data'
GRAPH_FOLDER = 'graphs'  # Folder for saving the plots

# ------------------ Existing: List model files ------------------ #
@download_bp.route('/download/models', methods=['GET'])
def list_models():
    try:
        files = os.listdir(SAVED_MODELS_DIR)
        return jsonify({'files': files})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ Existing: Download specific model ------------------ #
@download_bp.route('/download/model/<filename>', methods=['GET'])
def download_model(filename):
    file_path = os.path.join(SAVED_MODELS_DIR, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({'error': 'Model not found'}), 404

# ------------------ ✅ NEW: List cleaned CSV files ------------------ #
@download_bp.route('/download/cleaned-files', methods=['GET'])
def list_cleaned_files():
    try:
        files = os.listdir(CLEANED_DATA_DIR)
        return jsonify({'files': files})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------ ✅ NEW: Download cleaned CSV file ------------------ #
@download_bp.route('/download/cleaned-file/<filename>', methods=['GET'])
def download_cleaned_file(filename):
    file_path = os.path.join(CLEANED_DATA_DIR, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    return jsonify({'error': 'Cleaned file not found'}), 404

# ------------------ ✅ NEW: Download generated plot ------------------ #
@download_bp.route('/download/plot', methods=['GET'])
def download_plot():
    plot_path = os.path.join(GRAPH_FOLDER, 'plot.png')  # Assuming plot is saved as plot.png
    if os.path.exists(plot_path):
        return send_file(plot_path, as_attachment=True)
    return jsonify({'error': 'Plot not found'}), 404
