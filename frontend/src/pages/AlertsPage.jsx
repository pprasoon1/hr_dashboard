import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingDown, UserX, Clock, CheckCircle2, XCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AlertsDashboard = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: 'Low Performance',
      severity: 'high',
      message: 'Team Alpha showing 25% decrease in performance metrics',
      date: '2024-01-15',
      department: 'Engineering',
      suggestions: [
        'Schedule 1-on-1 meetings with team members',
        'Review current project deadlines and resources',
        'Implement daily stand-ups for better communication'
      ],
      status: 'open'
    },
    {
      id: 2,
      type: 'Consecutive Absences',
      severity: 'medium',
      message: 'John Doe has been absent for 3 consecutive days without notice',
      date: '2024-01-16',
      department: 'Marketing',
      suggestions: [
        'Contact employee through alternative means',
        'Review sick leave policy with team',
        'Schedule return-to-work meeting'
      ],
      status: 'open'
    },
    {
      id: 3,
      type: 'High Turnover Risk',
      severity: 'high',
      message: 'Sales department showing signs of high turnover risk',
      date: '2024-01-17',
      department: 'Sales',
      suggestions: [
        'Conduct employee satisfaction survey',
        'Review compensation packages',
        'Organize team building activities'
      ],
      status: 'in-progress'
    }
  ];

  // Mock data for trends
  const trendData = [
    { month: 'Sep', alerts: 5 },
    { month: 'Oct', alerts: 8 },
    { month: 'Nov', alerts: 12 },
    { month: 'Dec', alerts: 9 },
    { month: 'Jan', alerts: 15 }
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive" className="ml-2">Open</Badge>;
      case 'in-progress':
        return <Badge variant="warning" className="ml-2">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success" className="ml-2">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Alerts Dashboard</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Alerts</TabsTrigger>
            <TabsTrigger value="trends">Alert Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`${getSeverityStyle(alert.severity)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {alert.type}
                      {getStatusBadge(alert.status)}
                    </CardTitle>
                    <Badge variant="outline">{alert.department}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{alert.message}</p>
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Suggested Actions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {alert.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reported: {new Date(alert.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Alert Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="alerts" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingDown className="h-4 w-4" />
                  <AlertTitle>Performance Trends</AlertTitle>
                  <AlertDescription>
                    Engineering team performance has dropped by 25% in the last month. Consider scheduling team reviews and resource assessment.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <UserX className="h-4 w-4" />
                  <AlertTitle>Attendance Patterns</AlertTitle>
                  <AlertDescription>
                    Marketing department shows increasing unplanned absences. Recommend reviewing work-life balance policies.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Response Time</AlertTitle>
                  <AlertDescription>
                    Average alert resolution time has increased to 48 hours. Consider optimizing the response workflow.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlertsDashboard;