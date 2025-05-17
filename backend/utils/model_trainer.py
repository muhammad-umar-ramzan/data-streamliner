import os
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, r2_score

# Classification models
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

# Regression models
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from lightgbm import LGBMRegressor
from catboost import CatBoostRegressor
from sklearn.svm import SVR

# Clustering models (only KMeans)
from sklearn.cluster import KMeans

# Folder to store saved models
MODEL_FOLDER = 'saved_models'
os.makedirs(MODEL_FOLDER, exist_ok=True)

# Mapping model names to actual model classes
classification_models = {
    'LogisticRegression': LogisticRegression,
    'KNeighborsClassifier': KNeighborsClassifier,
    'SVC': SVC,
    'DecisionTreeClassifier': DecisionTreeClassifier,
    'RandomForestClassifier': RandomForestClassifier,
    'GaussianNB': GaussianNB,
    'XGBClassifier': XGBClassifier,
    'LGBMClassifier': LGBMClassifier,
    'CatBoostClassifier': CatBoostClassifier
}

regression_models = {
    'LinearRegression':LinearRegression,
    'Ridge':Ridge,
    'Lasso':Lasso,
    'DecisionTreeRegressor':DecisionTreeRegressor,
    'RandomForestRegressor':RandomForestRegressor,
    'XGBRegressor':XGBRegressor,
    'LGBMRegressor':LGBMRegressor,
    'CatBoostRegressor':CatBoostRegressor,
    'SVR':SVR
}

def train_model(df, target_column, task, model_name):
    if target_column not in df.columns:
        raise ValueError(f"Target column '{target_column}' not found in dataset")

    X = df.drop(columns=[target_column])
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train based on task type (classification or regression)
    if task == 'classification':
        model_class = classification_models.get(model_name)
        if not model_class:
            raise ValueError(f"Unsupported classification model: {model_name}")
    elif task == 'regression':
        model_class = regression_models.get(model_name)
        if not model_class:
            raise ValueError(f"Unsupported regression model: {model_name}")
    else:
        raise ValueError("Invalid task type. Choose 'classification' or 'regression'")

    # Initialize model with default parameters
    model = model_class()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    if task == 'classification':
        score = accuracy_score(y_test, y_pred)
    else:
        if len(y_test) < 2:
            score = None  # Not enough samples to calculate R²
        else:
            score = r2_score(y_test, y_pred)

    model_path = os.path.join(MODEL_FOLDER, f"{model_name}_model.pkl")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)

    return {
        "model_path": model_path,
        "score": score,
        "model": model_name,
        "task": task
    }

def run_kmeans(df, n_clusters=3):
    # Remove non-numeric columns for clustering
    df_numeric = df.select_dtypes(include=['number'])
    model = KMeans(n_clusters=n_clusters)
    df['cluster'] = model.fit_predict(df_numeric)
    
    # Save the model
    model_path = os.path.join(MODEL_FOLDER, f"kmeans_model.pkl")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)

    return {
        "inertia": model.inertia_,
        "clusters": df['cluster'].tolist(),
        "model_path": model_path
    }