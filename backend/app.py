from flask import Flask, request, jsonify
from ml_model.employee_predictor import EmployeePredictor
import pandas as pd
from flask_cors import CORS
import logging

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Initialize the EmployeePredictor
predictor = EmployeePredictor()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Global error handler for the API
@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error(f"Error: {str(e)}")
    return jsonify({'error': str(e)}), 400

# Endpoint for predicting leave
@app.route('/api/predict_leave', methods=['POST'])
def predict_leave():
    try:
        data = request.json
        app.logger.debug(f"Received data for leave prediction: {data}")
        
        df = pd.DataFrame(data)
        app.logger.debug(f"Converted DataFrame for leave prediction: {df.head()}")
        
        # Preprocess the data
        df = predictor.preprocess_data(df)
        app.logger.debug(f"Preprocessed DataFrame for leave prediction: {df.head()}")
        
        # Make prediction
        prediction = predictor.predict_leave(df)
        return jsonify({'prediction': prediction.tolist()})
    
    except Exception as e:
        app.logger.error(f"Error in /api/predict_leave: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Endpoint for predicting burnout
@app.route('/api/predict_burnout', methods=['POST'])
def predict_burnout():
    try:
        data = request.json
        app.logger.debug(f"Received data for burnout prediction: {data}")
        
        df = pd.DataFrame(data)
        app.logger.debug(f"Converted DataFrame for burnout prediction: {df.head()}")
        
        # Preprocess the data
        df = predictor.preprocess_data(df)
        app.logger.debug(f"Preprocessed DataFrame for burnout prediction: {df.head()}")
        
        # Make prediction
        prediction = predictor.predict_burnout(df)
        return jsonify({'prediction': prediction.tolist()})
    
    except Exception as e:
        app.logger.error(f"Error in /api/predict_burnout: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Endpoint for identifying peak leave periods
@app.route('/api/peak_leave_periods', methods=['GET'])
def peak_leave_periods():
    try:
        # Assuming the CSV is available in the same directory
        data = pd.read_csv('employee_data.csv')  # Replace with actual data source
        app.logger.debug(f"Data loaded for peak leave periods: {data.head()}")
        
        # Preprocess the data
        df = predictor.preprocess_data(data)
        peak_period = predictor.identify_peak_leave_periods(df)
        return jsonify({'peak_period': int(peak_period)})
    
    except Exception as e:
        app.logger.error(f"Error in /api/peak_leave_periods: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Endpoint for suggesting interventions
@app.route('/api/suggest_interventions', methods=['POST'])
def suggest_interventions():
    try:
        data = request.json
        app.logger.debug(f"Received data for intervention suggestion: {data}")
        
        suggestions = predictor.suggest_interventions(data)
        return jsonify({'suggestions': suggestions})
    
    except Exception as e:
        app.logger.error(f"Error in /api/suggest_interventions: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Health check endpoint for server status
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Running'}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
