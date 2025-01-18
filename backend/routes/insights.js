import { Router } from 'express';
const router = Router();
import Performance from '../models/Performance.js';
import Attendance from '../models/Attendance.js'; // Corrected import

// Get insights
router.get('/', async (req, res) => {
  try {
    const insights = [];

    // Calculate average performance score
    const avgPerformance = await Performance.aggregate([ // Corrected: use Performance.aggregate
      { $group: { _id: null, avgScore: { $avg: "$performance_score" } } }
    ]);

    if (avgPerformance.length > 0) {
      insights.push({
        type: 'Average Performance',
        value: avgPerformance[0].avgScore.toFixed(2)
      });
    }

    // Calculate attendance rate
    const totalAttendance = await Attendance.countDocuments(); // Corrected: use Attendance.countDocuments
    const presentAttendance = await Attendance.countDocuments({ attendance_status: 'Present' });
    const attendanceRate = ((presentAttendance / totalAttendance) * 100).toFixed(2);

    insights.push({
      type: 'Attendance Rate',
      value: `${attendanceRate}%`
    });

    // Top performers
    const topPerformers = await Performance.aggregate([ // Corrected: use Performance.aggregate
      { $group: { _id: "$employee_id", avgScore: { $avg: "$performance_score" } } },
      { $sort: { avgScore: -1 } },
      { $limit: 5 }
    ]);

    insights.push({
      type: 'Top Performers',
      value: topPerformers.map(p => ({ employeeId: p._id, score: p.avgScore.toFixed(2) }))
    });

    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
