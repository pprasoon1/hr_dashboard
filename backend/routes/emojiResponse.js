import { Router } from 'express';
import EmojiResponse from '../models/EmojiResponse.js';
import Employee from '../models/Employee.js';

const router = Router();

// Submit emoji response
router.post('/', async (req, res) => {
  try {
    const { employee_id, emoji, type } = req.body;

    // Validate request payload
    if (!employee_id || !emoji || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newResponse = new EmojiResponse({ employee_id, emoji, type });
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get happiness index
router.get('/happiness-index', async (req, res) => {
  try {
    const emojiMap = { '😊': 10, '😐': 5, '😟': 1 };

    // Fetch all emoji responses
    const responses = await EmojiResponse.find();
    if (!responses.length) {
      return res.status(200).json({
        message: 'No responses found.',
        overallHappinessIndex: 0,
        departmentHappinessIndex: {},
      });
    }

    const totalScore = responses.reduce((sum, response) => sum + emojiMap[response.emoji], 0);
    const averageScore = (totalScore / responses.length).toFixed(2);

    // Fetch all employees for department-wise calculations
    const employees = await Employee.find();
    const departmentScores = {};

    for (const employee of employees) {
      const employeeResponses = responses.filter(r => r.employee_id === employee.employee_id);
      if (employeeResponses.length > 0) {
        const employeeScore = employeeResponses.reduce(
          (sum, r) => sum + emojiMap[r.emoji],
          0
        ) / employeeResponses.length;

        if (!departmentScores[employee.department]) {
          departmentScores[employee.department] = [];
        }
        departmentScores[employee.department].push(employeeScore);
      }
    }

    // Calculate department-wise averages
    const departmentAverages = Object.entries(departmentScores).reduce((acc, [dept, scores]) => {
      acc[dept] = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2);
      return acc;
    }, {});

    res.json({
      overallHappinessIndex: averageScore,
      departmentHappinessIndex: departmentAverages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
