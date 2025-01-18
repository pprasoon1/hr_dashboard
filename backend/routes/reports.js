import express from 'express';
import { Parser } from 'json2csv';
import Employee from '../models/Employee.js';
import Performance from '../models/Performance.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

router.get('/export', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Fetch data
    const employees = await Employee.find();
    const performances = await Performance.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    const attendances = await Attendance.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    // Process data
    const reportData = employees.map(employee => {
      const employeePerformances = performances.filter(p => p.employee_id === employee.employee_id);
      const employeeAttendances = attendances.filter(a => a.employee_id === employee.employee_id);

      const avgPerformance = employeePerformances.reduce((sum, p) => sum + p.performance_score, 0) / employeePerformances.length;
      const attendanceRate = employeeAttendances.filter(a => a.attendance_status === 'Present').length / employeeAttendances.length;

      return {
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        role: employee.role,
        average_performance: avgPerformance.toFixed(2),
        attendance_rate: (attendanceRate * 100).toFixed(2) + '%'
      };
    });

    // Convert to CSV
    const fields = ['employee_id', 'name', 'department', 'role', 'average_performance', 'attendance_rate'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(reportData);

    // Send CSV file
    res.header('Content-Type', 'text/csv');
    res.attachment(`workforce_report_${startDate}_to_${endDate}.csv`);
    return res.send(csv);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;

