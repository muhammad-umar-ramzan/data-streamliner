import pandas as pd
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler, StandardScaler

def clean_data(df, target_column, task):
    df = df.copy()

    # 1. Drop duplicates
    df.drop_duplicates(inplace=True)

    # 2. Drop columns with >40% missing values and fill the rest
    missing_thresh = 0.4
    df = df.loc[:, df.isnull().mean() < missing_thresh]
    for col in df.columns:
        if df[col].isnull().sum() > 0:
            if df[col].dtype in ['int64', 'float64']:
                df[col].fillna(df[col].mean(), inplace=True)
            else:
                df[col].fillna(df[col].mode()[0], inplace=True)

    # 3. Convert object columns to datetime where possible
    for col in df.columns:
        if df[col].dtype == 'object':
            try:
                df[col] = pd.to_datetime(df[col])
            except:
                continue

    # 4. Extract date features
    date_cols = df.select_dtypes(include='datetime').columns
    for col in date_cols:
        df[f'{col}_year'] = df[col].dt.year
        df[f'{col}_month'] = df[col].dt.month
        df[f'{col}_day'] = df[col].dt.day
        df[f'{col}_weekday'] = df[col].dt.weekday
        df.drop(columns=[col], inplace=True)

    # 5. Remove constant or irrelevant columns
    for col in df.columns:
        if df[col].nunique() <= 1 or 'id' in col.lower() or 'name' in col.lower():
            df.drop(columns=[col], inplace=True)

    # 6. Remove outliers using IQR
    num_cols = df.select_dtypes(include=['int64', 'float64']).columns
    for col in num_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        df = df[(df[col] >= lower) & (df[col] <= upper)]

    # 7. Separate target column
    y = None
    if target_column and target_column in df.columns:
        y = df[target_column]
        df = df.drop(columns=[target_column])

    # 8. One-hot encode all categorical features
    # One-hot encode all categorical features and drop the first category for each
    df = pd.get_dummies(df, drop_first=True)

    # Convert only boolean columns (True/False) to integers
    bool_cols = df.select_dtypes(include=['bool']).columns
    df[bool_cols] = df[bool_cols].astype(int)



    # 9. Handle target column encoding based on task
    if y is not None:
        if task == 'classification':
            if y.dtype == 'object' or y.nunique() < 20:
                le = LabelEncoder()
                y = le.fit_transform(y)
        df[target_column] = y

    # 10. Feature Scaling if required
    # if scale_method == 'minmax':
    #     scaler = MinMaxScaler()
    #     df[df.columns] = scaler.fit_transform(df[df.columns])
    # elif scale_method == 'standard':
    #     scaler = StandardScaler()
    #     df[df.columns] = scaler.fit_transform(df[df.columns])

    # 11. Save cleaned dataset
    output_dir = 'cleaned_data'
    os.makedirs(output_dir, exist_ok=True)  
    file_path = os.path.join(output_dir, 'cleaned_dataset.csv')

    if os.path.exists(file_path):
      os.remove(file_path)  # Delete the existing file

    df.to_csv(file_path, index=False)
    print(f"Cleaned dataset saved to: {file_path}")

    print(f"Cleaned dataset saved to: {file_path}")
    return df
