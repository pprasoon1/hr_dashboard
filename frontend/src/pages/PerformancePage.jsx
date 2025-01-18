import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertTriangle, TrendingUp, UserCheck, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const PerformanceDashboard = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [leavePredictions, setLeavePredictions] = useState([]);
  const [burnoutPredictions, setBurnoutPredictions] = useState([]);
  const [peakLeavePeriod, setPeakLeavePeriod] = useState(null);
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performanceResponse = await axios.get('http://localhost:5000/api/performance');
        setPerformanceData(performanceResponse.data);

        const latestPerformance = performanceResponse.data[0];
        const [leaveRes, burnoutRes, peakLeaveRes, interventionRes] = await Promise.all([
          axios.post('http://localhost:5000/api/ml/predict_leave', {
            task_completion_rate: latestPerformance.task_completion_rate,
            workload: latestPerformance.workload,
            burnout_level: latestPerformance.burnout_level
          }),
          axios.post('http://localhost:5000/api/ml/predict_burnout', {
            task_completion_rate: latestPerformance.task_completion_rate,
            workload: latestPerformance.workload,
            burnout_level: latestPerformance.burnout_level
          }),
          axios.get('http://localhost:5000/api/ml/peak_leave_periods'),
          axios.post('http://localhost:5000/api/ml/suggest_interventions', latestPerformance)
        ]);

        setLeavePredictions([leaveRes.data.prediction]);
        setBurnoutPredictions([burnoutRes.data.prediction]);
        setPeakLeavePeriod(peakLeaveRes.data.peak_period);
        setInterventions(interventionRes.data.suggestions);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const riskMetrics = performanceData.map(data => ({
    date: new Date(data.date).toLocaleDateString(),
    'Burnout Risk': data.burnout_level / 10,
    'Workload': data.workload,
    'Task Completion': data.task_completion_rate
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Workforce Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Average Performance" 
          value={`${(performanceData.reduce((acc, curr) => acc + curr.performance_score, 0) / performanceData.length).toFixed(2)}%`}
          icon={TrendingUp}
          trend={2.5}
        />
        <StatCard 
          title="Burnout Risk Level" 
          value={burnoutPredictions[0] ? 'High' : 'Low'}
          icon={AlertTriangle}
          trend={-1.2}
        />
        <StatCard 
          title="Predicted Leave Days" 
          value={leavePredictions[0]?.toFixed(1)}
          icon={Calendar}
        />
        <StatCard 
          title="Team Wellness Score" 
          value={`${((1 - performanceData[0]?.burnout_level / 10) * 100).toFixed(1)}%`}
          icon={UserCheck}
          trend={1.8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance_score" stroke="#8884d8" name="Performance Score" />
                <Line type="monotone" dataKey="task_completion_rate" stroke="#82ca9d" name="Task Completion" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Risk Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Burnout Risk" fill="#ff8042" />
                <Bar dataKey="Workload" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Recommended Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interventions.map((intervention, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Action Item {index + 1}</h3>
              <p className="text-gray-600 dark:text-gray-300">{intervention}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;