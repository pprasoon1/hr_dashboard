import { Router } from 'express';
const router = Router();
import Employee from '../models/Employee.js';

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find(); // Use the `find` method to get all documents
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    employee_id: req.body.employee_id,
    department: req.body.department,
    role: req.body.role,
    performance_score: req.body.performance_score
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
