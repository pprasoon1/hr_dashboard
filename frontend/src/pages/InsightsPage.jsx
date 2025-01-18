import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const InsightsPage = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/insights');
        setInsights(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching insights');
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const getInsightValue = (type) => {
    const insight = insights.find(i => i.type === type);
    return insight ? insight.value : null;
  };

  const attendanceRate = getInsightValue('Attendance Rate');
  const averagePerformance = getInsightValue('Average Performance');

  const attendanceChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [parseFloat(attendanceRate), 100 - parseFloat(attendanceRate)],
        backgroundColor: ['#4CAF50', '#FF5252'],
        hoverBackgroundColor: ['#45a049', '#ff1744'],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Rate</h2>
          <Doughnut data={attendanceChartData} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Insights</h2>
          <div className="text-4xl font-bold text-center mb-4">{averagePerformance}</div>
          <div className="text-center text-gray-600 dark:text-gray-400">Average Performance Score</div>
        </div>
      </div>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
        <ul className="space-y-2">
          {getInsightValue('Top Performers')?.map((performer, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>Employee {performer.employeeId}</span>
              <span className="font-semibold">{performer.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightsPage;

