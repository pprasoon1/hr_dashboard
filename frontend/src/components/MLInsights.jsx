import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MLInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ml-insights/happiness-trends');
        setInsights(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ML insights');
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return <div>Loading ML insights...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const chartData = {
    labels: insights.movingAverage.map(point => new Date(point.date).toLocaleDateString()),
    datasets: [
      {
        label: '7-Day Moving Average',
        data: insights.movingAverage.map(point => point.average),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">ML Insights: Happiness Trends</h2>
      <div className="mb-4">
        <Line data={chartData} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Significant Changes</h3>
        <ul>
          {insights.significantChanges.map((change, index) => (
            <li key={index} className={change.change === 'increase' ? 'text-green-500' : 'text-red-500'}>
              {new Date(change.date).toLocaleDateString()}: {change.change} of magnitude {change.magnitude.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MLInsights;

