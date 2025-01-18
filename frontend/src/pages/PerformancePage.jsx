import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [leavePredictions, setLeavePredictions] = useState([]);
  const [burnoutPredictions, setBurnoutPredictions] = useState([]);
  const [peakLeavePeriod, setPeakLeavePeriod] = useState(null);
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performanceResponse = await axios.get('http://localhost:5000/api/performance');
        setPerformanceData(performanceResponse.data);

        const latestPerformance = performanceResponse.data[0];
        const leaveResponse = await axios.post('http://localhost:5000/api/ml/predict_leave', {
          task_completion_rate: latestPerformance.task_completion_rate,
          workload: latestPerformance.workload,
          burnout_level: latestPerformance.burnout_level
        });
        setLeavePredictions([leaveResponse.data.prediction]);

        const burnoutResponse = await axios.post('http://localhost:5000/api/ml/predict_burnout', {
          task_completion_rate: latestPerformance.task_completion_rate,
          workload: latestPerformance.workload,
          burnout_level: latestPerformance.burnout_level
        });
        setBurnoutPredictions([burnoutResponse.data.prediction]);

        const peakLeaveResponse = await axios.get('http://localhost:5000/api/ml/peak_leave_periods');
        setPeakLeavePeriod(peakLeaveResponse.data.peak_period);

        const interventionResponse = await axios.post('http://localhost:5000/api/ml/suggest_interventions', latestPerformance);
        setInterventions(interventionResponse.data.suggestions);

        setLoading(false);
      } catch (err) {
        setError('Error fetching performance data and predictions');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const chartData = {
    labels: performanceData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Performance Score',
        data: performanceData.map(data => data.performance_score),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Task Completion Rate',
        data: performanceData.map(data => data.task_completion_rate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Performance Metrics</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
        <Line data={chartData} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Leave Predictions</h3>
            <p>Predicted leave days: {leavePredictions[0]?.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Burnout Risk</h3>
            <p>Burnout risk: {burnoutPredictions[0] ? 'High' : 'Low'}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Peak Leave Period</h3>
          <p>Peak leave period: Month {peakLeavePeriod + 1}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Suggested Interventions</h3>
          <ul className="list-disc pl-5">
            {interventions.map((intervention, index) => (
              <li key={index}>{intervention}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;

