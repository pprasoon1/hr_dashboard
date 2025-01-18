import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HappinessIndex = () => {
  const [happinessData, setHappinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHappinessIndex = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emoji-response/happiness-index');
        setHappinessData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch happiness index data');
        setLoading(false);
      }
    };

    fetchHappinessIndex();
  }, []);

  if (loading) return <div>Loading happiness index data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const chartData = {
    labels: Object.keys(happinessData.departmentHappinessIndex),
    datasets: [
      {
        label: 'Department Happiness Index',
        data: Object.values(happinessData.departmentHappinessIndex),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Happiness Index</h2>
      <div className="mb-4">
        <p className="text-lg">Overall Happiness Index: {happinessData.overallHappinessIndex.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Department Happiness Index</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default HappinessIndex;

