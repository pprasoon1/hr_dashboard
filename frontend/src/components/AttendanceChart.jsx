import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AttendanceChart = ({ attendanceData }) => {
  const attendanceRates = attendanceData.reduce((acc, curr) => {
    const date = new Date(curr.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { present: 0, total: 0 };
    }
    acc[date].total++;
    if (curr.attendance_status === 'Present') {
      acc[date].present++;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(attendanceRates),
    datasets: [
      {
        label: 'Attendance Rate',
        data: Object.values(attendanceRates).map(rate => (rate.present / rate.total) * 100),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={{ scales: { y: { beginAtZero: true, max: 100 } } }} />
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;

