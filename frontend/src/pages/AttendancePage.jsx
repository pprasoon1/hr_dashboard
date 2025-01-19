import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AttendanceAnalysisDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Engineering');

  // Mock data
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  
  const employeeData = {
    Engineering: [
      { name: 'John Doe', id: 'E001', leavePattern: 75, predictedNextLeave: '2024-02-15' },
      { name: 'Jane Smith', id: 'E002', leavePattern: 92, predictedNextLeave: '2024-03-01' },
      { name: 'Mike Johnson', id: 'E003', leavePattern: 88, predictedNextLeave: '2024-02-20' },
    ],
    Marketing: [
      { name: 'Sarah Wilson', id: 'M001', leavePattern: 82, predictedNextLeave: '2024-02-10' },
      { name: 'Tom Brown', id: 'M002', leavePattern: 95, predictedNextLeave: '2024-03-15' },
    ],
  };

  const monthlyAttendanceData = [
    { month: 'Jan', attendance: 92, leaves: 8 },
    { month: 'Feb', attendance: 88, leaves: 12 },
    { month: 'Mar', attendance: 90, leaves: 10 },
    { month: 'Apr', attendance: 85, leaves: 15 },
    { month: 'May', attendance: 87, leaves: 13 },
    { month: 'Jun', attendance: 91, leaves: 9 },
  ];

  const departmentRiskData = {
    Engineering: { risk: 'Medium', peak: 'February-March' },
    Marketing: { risk: 'Low', peak: 'July-August' },
    Sales: { risk: 'High', peak: 'December-January' },
    HR: { risk: 'Low', peak: 'April-May' },
    Finance: { risk: 'Medium', peak: 'March-April' },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Attendance Analysis Dashboard</h1>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predicted Risk Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentRiskData[selectedDepartment].risk}</div>
              <p className="text-xs text-muted-foreground">Peak: {departmentRiskData[selectedDepartment].peak}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employee Coverage</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" name="Attendance %" />
                <Line type="monotone" dataKey="leaves" stroke="#82ca9d" name="Leave %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Risk Alert */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {selectedDepartment} department shows highest leave probability during {departmentRiskData[selectedDepartment].peak}. 
            Consider planning resources accordingly.
          </AlertDescription>
        </Alert>

        {/* Employee Leave Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Leave Patterns - {selectedDepartment}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeData[selectedDepartment]?.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {employee.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Attendance Score: {employee.leavePattern}%</p>
                    <p className="text-xs text-muted-foreground">
                      Predicted Next Leave: {employee.predictedNextLeave}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceAnalysisDashboard;