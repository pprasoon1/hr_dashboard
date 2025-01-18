import { Router } from 'express';
const router = Router();
import Leave from '../models/Leave.js';

// Helper function to identify the peak leave period
function identifyPeakLeavePeriods(leaveData) {
  const leaveCounts = leaveData.reduce((acc, leave) => {
    const month = new Date(leave.leave_date).getMonth(); // Get the month (0-11)
    acc[month] = (acc[month] || 0) + 1; // Increment the count for the month
    return acc;
  }, {});

  // Find the month with the highest leave count
  const peakMonth = Object.entries(leaveCounts).reduce((peak, [month, count]) => 
    count > peak.count ? { month: parseInt(month), count } : peak
  , { month: -1, count: 0 });

  // Return the month (0-11) with the highest leave count
  return peakMonth.month;
}

// Route to get the peak leave period
router.get('/peak-period', async (req, res) => {
  try {
    const leaves = await Leave.find(); // Corrected to use the Leave model
    const peakMonth = identifyPeakLeavePeriods(leaves);

    // If no peak month is found, return an appropriate message
    if (peakMonth === -1) {
      return res.status(404).json({ message: 'No leave data found' });
    }

    // Optional: Convert the month index (0-11) to a month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const peakMonthName = monthNames[peakMonth];

    res.json({ peakMonth: peakMonthName }); // Return the month name
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
