import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');

  // Dummy data for demonstration
  const dummyReportData = {
    summary: {
      totalEmployees: 150,
      averagePerformance: 87.5,
      attendanceRate: 94.2,
      departmentCount: 5
    },
    departmentPerformance: [
      { department: 'Engineering', performance: 89.5, attendance: 95.2, headcount: 45 },
      { department: 'Marketing', performance: 86.3, attendance: 93.8, headcount: 25 },
      { department: 'Sales', performance: 88.7, attendance: 94.5, headcount: 30 },
      { department: 'HR', performance: 85.9, attendance: 96.1, headcount: 15 },
      { department: 'Support', performance: 87.2, attendance: 93.4, headcount: 35 }
    ],
    performanceTrends: [
      { month: 'Jan', score: 86 },
      { month: 'Feb', score: 87 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 88 },
      { month: 'May', score: 89 }
    ],
    topPerformers: [
      { id: 'EMP001', name: 'John Doe', score: 98.5, department: 'Engineering' },
      { id: 'EMP045', name: 'Jane Smith', score: 97.8, department: 'Sales' },
      { id: 'EMP023', name: 'Mike Johnson', score: 97.2, department: 'Marketing' }
    ],
    attentionNeeded: [
      { id: 'EMP078', name: 'Sam Wilson', score: 72.5, department: 'Support', issue: 'Declining Performance' },
      { id: 'EMP092', name: 'Lisa Brown', score: 68.3, department: 'Engineering', issue: 'High Absenteeism' }
    ]
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      // In real implementation, replace with actual API call
      // const response = await axios.get(`http://localhost:5000/api/reports/comprehensive?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      // setReportData(response.data);
      
      // Using dummy data for demonstration
      setTimeout(() => {
        setReportData(dummyReportData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
      setLoading(false);
    }
  };

  const exportReport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/export?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `workforce_report_${dateRange.startDate}_to_${dateRange.endDate}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workforce Reports</h1>
        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            className="border rounded-md p-2"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            className="border rounded-md p-2"
          />
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
            <option value="xlsx">Excel</option>
          </select>
          <button
            onClick={generateReport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          <button
            onClick={exportReport}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            disabled={!reportData}
          >
            Export Report
          </button>
        </div>
      </div>

      {reportData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.summary.totalEmployees}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.summary.averagePerformance}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.summary.attendanceRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.summary.departmentCount}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
              <TabsTrigger value="department">Department Breakdown</TabsTrigger>
              <TabsTrigger value="attention">Attention Needed</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.performanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" name="Performance Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="department">
              <Card>
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Headcount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {reportData.departmentPerformance.map((dept, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.performance}%</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.attendance}%</td>
                            <td className="px-6 py-4 whitespace-nowrap">{dept.headcount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attention">
              <div className="space-y-4">
                {reportData.attentionNeeded.map((employee, index) => (
                  <Alert key={index} className="border-red-400">
                    <AlertDescription>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{employee.name}</span> ({employee.id})
                          <p className="text-sm text-gray-500">{employee.department}</p>
                        </div>
                        <div>
                          <span className="text-red-500 font-medium">Issue: {employee.issue}</span>
                          <p className="text-sm">Performance Score: {employee.score}%</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;