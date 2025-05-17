from flask import Blueprint, request, jsonify, send_file
import pandas as pd
import os
from werkzeug.utils import secure_filename
from utils.cleaner import clean_data
from utils.model_trainer import train_model, run_kmeans
from utils.plotter import generate_plot

dataset_bp = Blueprint('dataset_bp', __name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

uploaded_df = None  # Store uploaded DataFrame in memory
cleaned_df = None   # Store cleaned DataFrame in memory

@dataset_bp.route('/upload', methods=['POST'])
def upload_dataset():
    global uploaded_df, cleaned_df
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        if filename.endswith('.csv'):
            uploaded_df = pd.read_csv(filepath)
        elif filename.endswith(('.xls', '.xlsx')):
            uploaded_df = pd.read_excel(filepath)
        else:
            return jsonify({'error': 'Unsupported file type'}), 400
    except Exception as e:
        return jsonify({'error': f'Error reading file: {str(e)}'}), 500

    # Optional form values
    target_column = request.form.get('targetColumn')
    task = request.form.get('modelTask')
    learning_type = request.form.get('learningType')

    try:
        if learning_type:
            if learning_type.lower() == 'supervised':
                if not target_column or not task:
                    return jsonify({'error': 'Both targetColumn and modelTask are required for supervised learning'}), 400
                cleaned_df = clean_data(uploaded_df, target_column=target_column, task=task)
            elif learning_type.lower() == 'unsupervised':
                cleaned_df = clean_data(uploaded_df, target_column, task)
            else:
                return jsonify({'error': 'Invalid learning type. Must be "supervised" or "unsupervised"'}), 400
        else:
            cleaned_df = uploaded_df  # Just use uploaded data directly

    except Exception as e:
        return jsonify({'error': f'Data cleaning failed: {str(e)}'}), 500

    return jsonify({
        'message': '',
        'columns': uploaded_df.columns.tolist()
    })


@dataset_bp.route('/plot', methods=['POST'])
def plot_graph():
    global uploaded_df
    if uploaded_df is None:
        return jsonify({'error': 'No dataset uploaded'}), 400

    data = request.json
    graph_type = data.get('type')
    x_col = data.get('x')
    y_col = data.get('y')  # Optional for pie, hist

    if not graph_type or not x_col:
        return jsonify({'error': 'type and x column are required'}), 400

    try:
        # Use uploaded_df for plotting (not the cleaned one)
        image_path = generate_plot(uploaded_df, graph_type, x_col, y_col)
        return send_file(image_path, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@dataset_bp.route('/train/supervised', methods=['POST'])
def train_supervised():
    global cleaned_df
    if cleaned_df is None:
        return jsonify({'error': 'No cleaned dataset available'}), 400

    target = request.form.get('targetColumn')
    model_name = request.form.get('model_name')
    task = request.form.get('modelTask')

    if not all([target, model_name, task]):
        return jsonify({'error': 'Missing target_column, model_name, or task'}), 400

    try:
        result = train_model(cleaned_df, target, task, model_name)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@dataset_bp.route('/train/kmeans', methods=['POST'])
def train_unsupervised():
    global cleaned_df
    if cleaned_df is None:
        return jsonify({'error': 'No cleaned dataset available'}), 400

    try:
        n_clusters = int(request.form.get('clusters', 3))  # Get from form
        result = run_kmeans(cleaned_df, n_clusters)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
