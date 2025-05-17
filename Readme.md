<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
 
</head>
<body>

  <h1>📊 Data Streamliner</h1>
  <p><strong>From raw data to production-ready models</strong> — Clean datasets, generate reports, download visualizations, and export trained models — all in one streamlined platform.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>📁 Raw data cleaning and preprocessing</li>
    <li>📊 Generate beautiful interactive reports and visualizations</li>
    <li>🧠 Train machine learning models using libraries like <code>Scikit-learn</code>, <code>CatBoost</code>, <code>XGBoost</code>, and <code>LightGBM</code></li>
    <li>📥 Download charts and export trained models</li>
    <li>📝 Save and view user feedback with MySQL integration</li>
    <li>💻 Smooth UI built with Next.js, Tailwind CSS, and Framer Motion</li>
  </ul>

  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> Next.js, Tailwind CSS, Framer Motion</li>
    <li><strong>Backend:</strong> Flask, Flask-SQLAlchemy</li>
    <li><strong>Database:</strong> MySQL (for saving feedback and metadata)</li>
    <li><strong>ML Libraries:</strong> Scikit-learn, XGBoost, LightGBM, CatBoost, Seaborn, Matplotlib</li>
  </ul>

  <h2>📁 Project Structure</h2>
<pre><code>
data-streamliner/
│
├── backend/                         # Flask backend
│   ├── cleaned_data/               # Processed datasets
│   ├── controllers/                # API controllers
│   │   ├── dataset_controller.py
│   │   ├── download_controller.py
│   │   ├── feedback_controller.py
│   │   └── report_controller.py
│   ├── graphs/                     # Generated visualizations
│   ├── models/                     # Database models
│   ├── saved_models/              # Trained ML models
│   ├── uploaded_datasets/         # Raw uploaded data
│   ├── utils/                      # Utility functions
│   │   ├── cleaner.py              # Data cleaning
│   │   ├── model_trainer.py       # Model training
│   │   ├── plotter.py             # Visualization
│   │   └── report_generator.py
│   └── app.py                      # Main Flask application
│
├── frontend/                       # Next.js frontend
│   ├── .next/                      # Next.js build
│   ├── node_modules/
│   ├── public/                     # Static assets
│   │   ├── favicon.ico
│   ├── src/
│   │   ├── app/                    # App router
│   │   │   ├── blog/
│   │   │   ├── clean-data/
│   │   │   ├── download-clean-data/
│   │   │   ├── eda/
│   │   │   ├── feedback/
│   │   │   ├── pickle-file/
│   │   │   ├── report/
│   │   │   ├── train/
│   │   │   ├── work/
│   │   │   ├── globals.css
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── components/            # React components
│   │   │   ├── Blog.js
│   │   │   ├── CleanData.js
│   │   │   ├── DownloadCleanData.js
│   │   │   ├── EdaSummary.js
│   │   │   ├── FeedbackForm.js
│   │   │   ├── HowItWorks.js
│   │   │   ├── PickleFilesSection.js
│   │   │   ├── ReportSection.js
│   │   │   └── TrainModelForm.js
│   └── package.json
│
├── database/
│   └── db_config.sql              # MySQL table creation & config
│
├── assets/                        # Images, visualizations
│
├── requirements.txt               # Python dependencies
├── README.html                    # This file
└── .env                           # Environment variables
</code></pre>


  <h2>⚙️ Installation & Setup</h2>

  <h3>1. Clone the repository</h3>
  <pre><code>git clone https://github.com/muhammad-umar-ramzan/data-streamliner.git
cd data-streamliner</code></pre>

  <h3>2. Set up the backend (Flask)</h3>
  <pre><code>cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt</code></pre>

  <h3>3. Set up the frontend (Next.js)</h3>
  <pre><code>cd ../frontend
npm install
npm run dev</code></pre>

  <h3>4. Start the Flask backend</h3>
  <pre><code>cd ../backend
python app.py</code></pre>

  <p>Make sure both frontend and backend servers are running properly. Frontend will typically be at <code>http://localhost:3000</code> and backend at <code>http://localhost:5000</code>.</p>

  <h2>🧪 Testing the System</h2>
  <ol>
    <li>Go to the home page</li>
    <li>Upload or input your dataset</li>
    <li>View data cleaning, preprocessing, and visualizations</li>
    <li>Train your ML model and export it</li>
    <li>Leave feedback — stored in the MySQL database</li>
  </ol>

  <h2>🗃️ Dependencies (Backend)</h2>
  <p>Some major libraries used:</p>
  <ul>
    <li>Flask, Flask-Bcrypt, Flask-Cors, Flask-SQLAlchemy</li>
    <li>CatBoost, LightGBM, XGBoost, Scikit-learn</li>
    <li>Matplotlib, Seaborn, Pandas, Numpy</li>
    <li>pdfkit, WeasyPrint (for report generation)</li>
    <li>mysql-connector-python</li>
  </ul>

  <h2>🤝 Contribution</h2>
  <p>Feel free to fork, clone, and contribute! Make a pull request after your changes. For major features, open an issue first to discuss what you would like to change.</p>

  <h2>📩 Contact</h2>
  <p>Created with ❤️ by Muhammad Umar.</p>

</body>
</html>
