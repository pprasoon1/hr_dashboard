import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState('');
  const [interventions, setInterventions] = useState([]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [predictionResponse, interventionsResponse] = await Promise.all([
        axios.post('http://localhost:5000/api/ml/predict_productivity_dip', inputs),
        axios.post('http://localhost:5000/api/ml/suggest_interventions', inputs)
      ]);
      setPrediction(predictionResponse.data.prediction);
      setInterventions(interventionsResponse.data.suggestions);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4">
          <label htmlFor="input1" className="block text-gray-700 font-bold mb-2">Input 1:</label>
          <input type="text" id="input1" name="input1" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* Add more input fields as needed */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
      {prediction && (
        <div className="mt-4">
          <h3 className="font-semibold">Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
      {interventions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Suggested Interventions:</h3>
          <ul className="list-disc pl-5">
            {interventions.map((intervention, index) => (
              <li key={index}>{intervention}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;

