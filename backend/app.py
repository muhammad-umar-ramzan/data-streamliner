# backend/app.py

from flask import Flask
from flask_cors import CORS
from controllers.dataset_controller import dataset_bp
from controllers.feedback_controller import feedback_bp
from controllers.download_controller import download_bp
from controllers.report_controller import report_bp

app = Flask(__name__)
CORS(app)


# Register Blueprints
app.register_blueprint(dataset_bp)
app.register_blueprint(feedback_bp)
app.register_blueprint(download_bp)
app.register_blueprint(report_bp)

if __name__ == '__main__':
    app.run(debug=True)
