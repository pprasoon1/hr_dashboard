import React, { useState } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/reports/comprehensive');
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Generate Comprehensive Report</h2>
        <button
          onClick={generateReport}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </button>

        {report && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Report Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Employee Distribution</h4>
                <ul>
                  {report.employeesByDepartment.map((dept, index) => (
                    <li key={index}>{dept._id}: {dept.count}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Performance Metrics</h4>
                <p>Average Performance Score: {report.averagePerformance}</p>
                <p>Attendance Rate: {report.attendanceRate}%</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Top Performers</h4>
              <ul>
                {report.topPerformers.map((performer, index) => (
                  <li key={index}>Employee {performer._id}: {performer.avgScore.toFixed(2)}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Bottom Performers</h4>
              <ul>
                {report.bottomPerformers.map((performer, index) => (
                  <li key={index}>Employee {performer._id}: {performer.avgScore.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

