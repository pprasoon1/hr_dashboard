import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, LineChart, AreaChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Area, Pie, Cell } from 'recharts';
import { AlertCircle, Download, TrendingUp, Users, Calendar, Award, Bell } from 'lucide-react';

const Dashboard = () => {
  // Mock data - In real app, this would come from API
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const timeframes = ['week', 'month', 'quarter', 'year'];

  // Mock performance data
  const performanceData = [
    { month: 'Jan', teamAvg: 85, individualAvg: 82, target: 80 },
    { month: 'Feb', teamAvg: 88, individualAvg: 85, target: 80 },
    { month: 'Mar', teamAvg: 84, individualAvg: 86, target: 80 },
    { month: 'Apr', teamAvg: 90, individualAvg: 88, target: 80 },
    { month: 'May', teamAvg: 87, individualAvg: 89, target: 80 },
    { month: 'Jun', teamAvg: 91, individualAvg: 90, target: 80 }
  ];

  // Mock attendance data
  const attendanceData = [
    { month: 'Jan', present: 95, late: 3, absent: 2 },
    { month: 'Feb', present: 94, late: 4, absent: 2 },
    { month: 'Mar', present: 96, late: 2, absent: 2 },
    { month: 'Apr', present: 93, late: 5, absent: 2 },
    { month: 'May', present: 97, late: 2, absent: 1 },
    { month: 'Jun', present: 95, late: 3, absent: 2 }
  ];

  // Mock leave trends
  const leaveData = [
    { name: 'Sick Leave', value: 30 },
    { name: 'Vacation', value: 45 },
    { name: 'Personal', value: 15 },
    { name: 'Other', value: 10 }
  ];

  // Mock productivity metrics
  const productivityData = [
    { week: 'W1', actual: 85, expected: 80 },
    { week: 'W2', actual: 88, expected: 80 },
    { week: 'W3', actual: 92, expected: 80 },
    { week: 'W4', actual: 86, expected: 80 }
  ];

  // Mock top performers
  const topPerformers = [
    { name: 'John Doe', score: 95, department: 'Engineering' },
    { name: 'Jane Smith', score: 94, department: 'Marketing' },
    { name: 'Mike Johnson', score: 93, department: 'Sales' },
    { name: 'Sarah Williams', score: 92, department: 'HR' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const exportToCSV = () => {
    // Combine all data into a single array
    const allData = [
      ...performanceData.map(item => ({ ...item, category: 'Performance' })),
      ...attendanceData.map(item => ({ ...item, category: 'Attendance' })),
      ...leaveData.map(item => ({ ...item, category: 'Leave' })),
      ...productivityData.map(item => ({ ...item, category: 'Productivity' })),
      ...topPerformers.map(item => ({ ...item, category: 'Top Performers' }))
    ];

    // Convert data to CSV string
    const csvContent = [
      // CSV header
      Object.keys(allData[0]).join(','),
      // CSV rows
      ...allData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'workforce_analytics_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workforce Analytics Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Track, analyze, and optimize workforce performance</p>
          </div>
          <div className="flex gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map(time => (
                  <SelectItem key={time} value={time}>{time.charAt(0).toUpperCase() + time.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Avg Performance</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">87%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">95%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Leave Utilization</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Top Performers</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Recent Alerts</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4">
              <li>Engineering team's productivity dropped by 5% this week</li>
              <li>Unusual spike in sick leave requests for Marketing department</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="performance" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="attendance">Attendance & Leave</TabsTrigger>
            <TabsTrigger value="productivity">Productivity Analysis</TabsTrigger>
            <TabsTrigger value="insights">Team Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Team vs Individual Average Performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart width={500} height={300} data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="teamAvg" stroke="#8884d8" name="Team Average" />
                    <Line type="monotone" dataKey="individualAvg" stroke="#82ca9d" name="Individual Average" />
                    <Line type="monotone" dataKey="target" stroke="#ff7300" name="Target" strokeDasharray="5 5" />
                  </LineChart>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Highest performing employees this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-gray-500">{performer.department}</p>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-yellow-400 mr-2" />
                          <span className="font-bold">{performer.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Monthly attendance patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart width={500} height={300} data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="present" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Present" />
                    <Area type="monotone" dataKey="late" stackId="1" stroke="#ffc658" fill="#ffc658" name="Late" />
                    <Area type="monotone" dataKey="absent" stackId="1" stroke="#ff8042" fill="#ff8042" name="Absent" />
                  </AreaChart>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leave Distribution</CardTitle>
                  <CardDescription>Types of leave taken</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart width={400} height={300}>
                    <Pie
                      data={leaveData}
                      cx={200}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leaveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="productivity">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Productivity</CardTitle>
                  <CardDescription>Comparison of actual vs expected productivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart width={500} height={300} data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="actual" fill="#8884d8" name="Actual Productivity" />
                    <Bar dataKey="expected" fill="#82ca9d" name="Expected Productivity" />
                  </BarChart>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Productivity Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of weekly productivity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productivityData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{data.week}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold text-blue-600">{data.actual}%</span>
                          <span className="ml-4 text-gray-500">vs</span>
                          <span className="ml-4 text-green-600 font-bold">{data.expected}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Insights</CardTitle>
                  <CardDescription>Key insights based on current trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Engineering Team</p>
                        <p className="text-sm text-gray-500">Team performance insights</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="font-bold text-blue-600">Improved by 10%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Marketing Team</p>
                        <p className="text-sm text-gray-500">Challenges and opportunities</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                        <span className="font-bold text-green-600">Growing by 5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">HR Team</p>
                        <p className="text-sm text-gray-500">Pending leave requests</p>
                      </div>
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="font-bold text-yellow-600">15 requests</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employee Satisfaction</CardTitle>
                  <CardDescription>Employee feedback trends and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Overall Satisfaction</p>
                        <p className="text-sm text-gray-500">Employee satisfaction across teams</p>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="font-bold text-blue-600">4.5 / 5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Leadership Effectiveness</p>
                        <p className="text-sm text-gray-500">Ratings of team leaders</p>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="font-bold text-yellow-600">4.3 / 5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

