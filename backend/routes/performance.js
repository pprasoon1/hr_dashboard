import { Router } from 'express';
const router = Router();
import Performance from '../models/Performance.js';

// Get all performance records
router.get('/', async (req, res) => {
  try {
    const performances = await Performance.find().sort({ date: -1 });
    res.json(performances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get performance records for a specific employee
router.get('/:employeeId', async (req, res) => {
  try {
    const performances = await Performance.find({ employee_id: req.params.employeeId }).sort({ date: -1 });
    res.json(performances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new performance record
router.post('/', async (req, res) => {
  const performance = new Performance({
    employee_id: req.body.employee_id,
    task_completion_rate: req.body.task_completion_rate,
    performance_score: req.body.performance_score,
    date: req.body.date
  });

  try {
    const newPerformance = await performance.save();
    res.status(201).json(newPerformance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

