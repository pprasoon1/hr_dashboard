import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, TrendingUp, Users, Calendar, Target, Brain, AlertTriangle } from 'lucide-react';

const InsightsDashboard = () => {
  // Dummy data
  const performanceData = [
    { month: 'Jan', productivity: 85, attendance: 92, taskCompletion: 88, department: 'Engineering' },
    { month: 'Feb', productivity: 88, attendance: 94, taskCompletion: 90, department: 'Engineering' },
    { month: 'Mar', productivity: 82, attendance: 90, taskCompletion: 85, department: 'Engineering' },
    { month: 'Apr', productivity: 90, attendance: 95, taskCompletion: 92, department: 'Engineering' },
  ];

  const leavePatterns = [
    { month: 'Jan', planned: 45, unplanned: 12 },
    { month: 'Feb', planned: 38, unplanned: 15 },
    { month: 'Mar', planned: 52, unplanned: 18 },
    { month: 'Apr', planned: 35, unplanned: 10 },
  ];

  const predictiveInsights = [
    {
      title: "Potential Productivity Dip",
      description: "Engineering team showing signs of burnout. Predicted 15% productivity decrease in next month.",
      severity: "high"
    },
    {
      title: "Leave Pattern Alert",
      description: "Unusual spike in unplanned leaves in Marketing department.",
      severity: "medium"
    },
    {
      title: "Resource Shortage Risk",
      description: "Multiple leave requests pending for May - potential understaffing risk.",
      severity: "low"
    }
  ];

  const departmentPerformance = [
    { department: 'Engineering', score: 88, trend: '+3%' },
    { department: 'Marketing', score: 85, trend: '-2%' },
    { department: 'Sales', score: 92, trend: '+5%' },
    { department: 'Support', score: 87, trend: '+1%' },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('All');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workforce Insights Dashboard</h1>
        <div className="flex gap-4">
          <select 
            className="p-2 border rounded-md"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid gap-4">
        {predictiveInsights.map((insight, index) => (
          <Alert key={index} className={`${
            insight.severity === 'high' ? 'border-red-400' :
            insight.severity === 'medium' ? 'border-yellow-400' :
            'border-blue-400'
          }`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{insight.title}</AlertTitle>
            <AlertDescription>{insight.description}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">-1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employee Engagement</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="leave">Leave Patterns</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="productivity" stroke="#8884d8" />
                    <Line type="monotone" dataKey="attendance" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="taskCompletion" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Patterns Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leavePatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#8884d8" />
                    <Bar dataKey="unplanned" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentPerformance.map((dept, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{dept.department}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{dept.score}%</div>
                  <div className={`text-sm ${
                    dept.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {dept.trend} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI-Powered Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <div className="min-w-0">
                <p className="font-medium">Team Building Focus</p>
                <p className="text-sm text-muted-foreground">Engineering team's collaboration scores have dropped by 5%. Consider organizing team building activities.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-0">
                <p className="font-medium">Workload Distribution</p>
                <p className="text-sm text-muted-foreground">20% of employees are handling 45% of tasks. Consider redistributing workload to prevent burnout.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="min-w-0">
                <p className="font-medium">Skills Development</p>
                <p className="text-sm text-muted-foreground">Identified skill gaps in cloud technologies. Recommend training programs for 15 team members.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsDashboard;