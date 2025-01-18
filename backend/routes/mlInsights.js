import { Router } from 'express';
const router = Router();
import EmojiResponse from '../models/EmojiResponse.js';

router.get('/happiness-trends', async (req, res) => {
  try {
    const emojiMap = { '😊': 10, '😐': 5, '😟': 1 };
    const responses = await EmojiResponse.find().sort('timestamp');

    // Calculate 7-day moving average
    const movingAverage = responses.reduce((acc, response, index) => {
      const score = emojiMap[response.emoji];
      const sum = acc.sum + score;
      const count = acc.count + 1;

      if (index >= 6) {
        const average = sum / 7;
        acc.averages.push({ date: response.timestamp, average });
        acc.sum -= emojiMap[responses[index - 6].emoji];
        acc.count--;
      }

      return { sum, count, averages: acc.averages };
    }, { sum: 0, count: 0, averages: [] }).averages;

    // Detect significant changes
    const significantChanges = movingAverage.reduce((acc, point, index) => {
      if (index > 0) {
        const change = point.average - movingAverage[index - 1].average;
        if (Math.abs(change) > 1) {  // Threshold for significant change
          acc.push({
            date: point.date,
            change: change > 0 ? 'increase' : 'decrease',
            magnitude: Math.abs(change),
          });
        }
      }
      return acc;
    }, []);

    res.json({
      movingAverage,
      significantChanges,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
