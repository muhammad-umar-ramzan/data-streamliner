# backend/utils/report_generator.py

import pdfkit
import pandas as pd

def generate_report(df, filename='report.pdf'):
    html = f"""
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: Arial, sans-serif;
                padding: 40px;
                background-color: #f9f9f9;
                color: #333;
            }}
            h1 {{
                color: #2c3e50;
                border-bottom: 2px solid #2c3e50;
                padding-bottom: 10px;
            }}
            h2 {{
                color: #34495e;
                margin-top: 30px;
            }}
            p {{
                font-size: 16px;
                margin: 8px 0;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }}
            th {{
                background-color: #2c3e50;
                color: white;
                padding: 10px;
                border: 1px solid #ccc;
            }}
            td {{
                padding: 8px;
                border: 1px solid #ccc;
                text-align: center;
            }}
            tr:nth-child(even) {{
                background-color: #f2f2f2;
            }}
        </style>
    </head>
    <body>
        <h1>📊 Dataset Report</h1>
        <h2>📐 Shape:</h2>
        <p>Rows: {df.shape[0]}, Columns: {df.shape[1]}</p>

        <h2>🧾 Columns:</h2>
        <p>{', '.join(df.columns)}</p>

        <h2>📈 Summary Statistics:</h2>
        {df.describe(include='all').to_html(classes='table', border=0)}
    </body>
    </html>
    """
    pdfkit.from_string(html, filename)
    return filename
