import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendance');
        setAttendanceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching attendance data');
        setLoading(false);
      }
    };
    fetchAttendanceData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const attendanceChartData = {
    labels: attendanceData.map(record => new Date(record.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Attendance Rate',
        data: attendanceData.map(record => 
          record.attendance_status === 'Present' ? 1 : 0
        ),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Trends</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Daily Attendance Rate</h2>
        <Line data={attendanceChartData} />
      </div>
    </div>
  );
};

export default AttendancePage;

