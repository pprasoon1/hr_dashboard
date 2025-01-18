import pandas as pd  # type: ignore
from backend.ml_model.employee_predictor import EmployeePredictor
from pymongo import MongoClient  # type: ignore

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['hrdashboard']

# Fetch and clean data from MongoDB
performance_data = pd.DataFrame(list(db.performances.find()))
leave_data = pd.DataFrame(list(db.leaves.find()))

# Ensure both DataFrames have a common key (e.g., employee_id)
if 'employee_id' in performance_data.columns and 'employee_id' in leave_data.columns:
    merged_data = pd.merge(performance_data, leave_data, on='employee_id', how='inner')
else:
    raise ValueError("Missing 'employee_id' in one of the collections")

# Handle NaN values by dropping or imputing them
merged_data = merged_data.dropna(subset=['task_completion_rate', 'workload', 'burnout_level', 'leave_duration'])

# Prepare data for training
X = merged_data[['task_completion_rate', 'workload', 'burnout_level']]
y_leave = merged_data['leave_duration']
y_burnout = merged_data['burnout_level'] > 7  # Binary label for burnout

# Ensure consistent lengths of X and y
if len(X) != len(y_leave):
    min_length = min(len(X), len(y_leave))
    X = X[:min_length]
    y_leave = y_leave[:min_length]

# Initialize and train models
predictor = EmployeePredictor()
predictor.train_leave_model(X, y_leave)
predictor.train_burnout_model(X, y_burnout)
predictor.train_kmeans_model(X)

# Output success message
print("Models trained and saved successfully!")
