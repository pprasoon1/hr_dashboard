import { Router } from 'express';
const router = Router();
import Attendance from '../models/Attendance.js';

// Get attendance data
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new attendance record
router.post('/', async (req, res) => {
  const attendance = new Attendance({
    employee_id: req.body.employee_id,
    date: req.body.date,
    attendance_status: req.body.attendance_status
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

