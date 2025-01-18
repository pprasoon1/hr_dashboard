import { Router } from 'express';
const router = Router();
import Performance from '../models/Performance.js';
import Attendance from '../models/Attendance.js';

// Get all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = [];

    // Check for low performance scores
    const lowPerformances = await Performance.find({ performance_score: { $lt: 5 } }).sort({ date: -1 }).limit(10);
    lowPerformances.forEach(perf => {
      alerts.push({
        type: 'Low Performance',
        message: `Employee ${perf.employee_id} has a low performance score of ${perf.performance_score}`,
        date: perf.date
      });
    });

    // Check for consecutive absences
    const recentAbsences = await Attendance.find({ attendance_status: 'Absent' }).sort({ date: -1 }).limit(50);
    const absenceMap = {};
    recentAbsences.forEach(absence => {
      if (!absenceMap[absence.employee_id]) {
        absenceMap[absence.employee_id] = [];
      }
      absenceMap[absence.employee_id].push(absence.date);
    });

    Object.entries(absenceMap).forEach(([employeeId, dates]) => {
      if (dates.length >= 3) {
        alerts.push({
          type: 'Consecutive Absences',
          message: `Employee ${employeeId} has been absent for ${dates.length} consecutive days`,
          date: dates[0]
        });
      }
    });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

