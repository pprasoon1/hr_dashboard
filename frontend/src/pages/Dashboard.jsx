import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { AlertCircle, Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TopPerformers from '../components/TopPerformers';
import LeaveCalendar from '../components/LeaveCalendar';
import ProductivityPrediction from '../components/ProductivityPrediction';
import AttendanceChart from '../components/AttendanceChart';
import {DatePickerWithRange} from '../components/DatePickerWithRange'; // Ensure this is correctly imported

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState(['All']);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [dateRange, setDateRange] = useState({ from: new Date(new Date().getFullYear(), 0, 1), to: new Date() });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          employeesResponse,
          performanceResponse,
          attendanceResponse,
          alertsResponse
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/employees'),
          axios.get('http://localhost:5000/api/performance'),
          axios.get('http://localhost:5000/api/attendance'),
          axios.get('http://localhost:5000/api/alerts')
        ]);

        setEmployeeData(employeesResponse.data);
        setPerformanceData(performanceResponse.data);
        setAttendanceData(attendanceResponse.data);
        setAlerts(alertsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const generateReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/export', {
        params: {
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString(),
          department: selectedDepartment
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'workforce_report.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const filteredEmployeeData = selectedDepartment === 'All'
    ? employeeData
    : employeeData.filter(emp => emp.department === selectedDepartment);

  const departmentData = filteredEmployeeData.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = 0;
    }
    acc[employee.department]++;
    return acc;
  }, {});

  const employeeDistributionData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: 'Employees per Department',
        data: Object.values(departmentData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const performanceTrendData = {
    labels: performanceData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Performance Score',
        data: performanceData.map(data => data.performance_score),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">HR Dashboard</h1>

      <div className="flex justify-between items-center mb-6">
        <Select onValueChange={handleDepartmentChange} defaultValue={selectedDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
        <Button onClick={generateReport} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      {alerts.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Alerts</AlertTitle>
          <AlertDescription>
            {alerts.map((alert, index) => (
              <div key={index}>{alert.message}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={employeeDistributionData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={performanceTrendData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance">
          <TopPerformers employeeData={filteredEmployeeData} />
          <ProductivityPrediction />
        </TabsContent>
        <TabsContent value="attendance">
          <AttendanceChart attendanceData={attendanceData} />
        </TabsContent>
        <TabsContent value="leave">
          <LeaveCalendar leaveData={leaveData} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
