import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from joblib import dump, load

class EmployeePredictor:
    def __init__(self):
        self.leave_model = None
        self.burnout_model = None
        self.kmeans_model = None
        self.scaler = StandardScaler()

    def preprocess_data(self, data):
        # Convert date columns to datetime
        date_columns = ['leave_date']
        for col in date_columns:
            if col in data.columns:
                data[col] = pd.to_datetime(data[col])
        
        # Extract features from date
        data['day_of_week'] = data['leave_date'].dt.dayofweek
        data['month'] = data['leave_date'].dt.month
        
        # One-hot encode categorical variables
        categorical_columns = ['department']
        data = pd.get_dummies(data, columns=categorical_columns)
        
        return data

    def train_leave_model(self, X, y):
        pipeline = Pipeline([
            ('imputer', SimpleImputer(strategy='mean')),
            ('scaler', StandardScaler()),
            ('rf', RandomForestRegressor(n_estimators=100, random_state=42))
        ])
        self.leave_model = pipeline.fit(X, y)
        dump(self.leave_model, 'leave_model.joblib')

    def train_burnout_model(self, X, y):
        pipeline = Pipeline([
            ('imputer', SimpleImputer(strategy='mean')),
            ('scaler', StandardScaler()),
            ('rf', RandomForestClassifier(n_estimators=100, random_state=42))
        ])
        self.burnout_model = pipeline.fit(X, y)
        dump(self.burnout_model, 'burnout_model.joblib')

    def train_kmeans_model(self, X):
        pipeline = Pipeline([
            ('imputer', SimpleImputer(strategy='mean')),
            ('scaler', StandardScaler()),
            ('kmeans', KMeans(n_clusters=3, random_state=42))
        ])
        self.kmeans_model = pipeline.fit(X)
        dump(self.kmeans_model, 'kmeans_model.joblib')

    def predict_leave(self, X):
        if self.leave_model is None:
            self.leave_model = load('leave_model.joblib')
        return self.leave_model.predict(X)

    def predict_burnout(self, X):
        if self.burnout_model is None:
            self.burnout_model = load('burnout_model.joblib')
        return self.burnout_model.predict(X)

    def identify_peak_leave_periods(self, X):
        if self.kmeans_model is None:
            self.kmeans_model = load('kmeans_model.joblib')
        clusters = self.kmeans_model.predict(X)
        return pd.Series(clusters).value_counts().index[0]

    def suggest_interventions(self, performance_data):
        # Simple rule-based system for suggesting interventions
        suggestions = []
        if performance_data['task_completion_rate'] < 0.7:
            suggestions.append("Provide additional training or resources")
        if performance_data['workload'] > 0.8:
            suggestions.append("Consider redistributing workload")
        if performance_data['burnout_risk'] > 0.7:
            suggestions.append("Schedule a wellness check-in")
        return suggestions

# Example usage:
# predictor = EmployeePredictor()
# predictor.train_leave_model(X_train, y_train)
# predictor.train_burnout_model(X_train, y_train)
# predictor.train_kmeans_model(X_train)
# leave_prediction = predictor.predict_leave(X_test)
# burnout_prediction = predictor.predict_burnout(X_test)
# peak_leave_period = predictor.identify_peak_leave_periods(X_test)
# interventions = predictor.suggest_interventions(employee_data)

