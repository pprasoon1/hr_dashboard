import * as tf from '@tensorflow/tfjs';
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

config();

import employeeRoutes from './routes/employees.js';
import attendanceRoutes from './routes/attendance.js';
import performanceRoutes from './routes/performance.js';
import alertRoutes from './routes/alerts.js';
import insightRoutes from './routes/insights.js';
import reportRoutes from './routes/reports.js';
import emojiResponseRoutes from './routes/emojiResponse.js';
import emailDispatchRoutes from './routes/emailDispatch.js';
import mlInsightRoutes from './routes/mlInsights.js';

import Leave from './models/Leave.js';
import Performance from './models/Performance.js';
import EmployeePredictor from './models/tfModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hrdashboard';

const predictor = new EmployeePredictor();

// Middleware
app.use(cors());
app.use(json());

// MongoDB connection
const connectDB = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Train models
async function trainModels() {
  try {
    console.log('Starting model training...');
    const performanceData = await Performance.find();
    const leaveData = await Leave.find();

    if (!performanceData.length || !leaveData.length) {
      console.warn('No data available for training models');
      return;
    }

    await predictor.trainLeaveModel(leaveData);
    await predictor.trainBurnoutModel(performanceData);
    console.log('Models trained successfully');
  } catch (error) {
    console.error('Error training models:', error);
  }
}

// Initialize app
const initializeApp = async () => {
  await connectDB();
  await trainModels();
};

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/emoji-response', emojiResponseRoutes);
app.use('/api/email-dispatch', emailDispatchRoutes);
app.use('/api/ml-insights', mlInsightRoutes);

app.post('/api/ml/predict_leave', async (req, res) => {
  try {
    const { task_completion_rate, workload, burnout_level } = req.body;
    const inputData = [task_completion_rate, workload, burnout_level];
    const prediction = await predictor.predictLeave(inputData);
    res.json({ prediction });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ml/predict_burnout', async (req, res) => {
  try {
    const { task_completion_rate, workload, performance_score } = req.body;
    const inputData = [task_completion_rate, workload, performance_score];
    const prediction = await predictor.predictBurnout(inputData);
    res.json({ prediction });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ml/predict_productivity_dip', async (req, res) => {
  try {
    const { task_completion_rate, workload, performance_score } = req.body;
    const inputData = [task_completion_rate, workload, performance_score];
    const prediction = await predictor.predictProductivityDip(inputData);
    res.json({ prediction });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ml/peak_leave_periods', async (req, res) => {
  try {
    const leaveData = await Leave.find();
    if (!leaveData.length) {
      return res.status(404).json({ error: 'No leave data available' });
    }
    const peakPeriod = predictor.identifyPeakLeavePeriods(leaveData);
    res.json({ peak_period: peakPeriod });
  } catch (error) {
    console.error('Peak leave period error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ml/suggest_interventions', (req, res) => {
  try {
    const suggestions = predictor.suggestInterventions(req.body);
    res.json({ suggestions });
  } catch (error) {
    console.error('Intervention suggestion error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
const frontendBuildPath = path.join(__dirname, 'frontend', 'build');

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
  });
} else {
  console.error(`Frontend build directory not found: ${frontendBuildPath}`);
  console.error('Ensure you have run `npm run build` in the frontend directory.');
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
initializeApp()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  });

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise rejection:', err);
  process.exit(1);
});



// import * as tf from '@tensorflow/tfjs';
// import express, { json } from 'express';
// import { connect } from 'mongoose';
// import cors from 'cors';
// import { config } from 'dotenv';
// import EmployeePredictor from './models/tfModels.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

// config();

// import employeeRoutes from './routes/employees.js';
// import attendanceRoutes from './routes/attendance.js';
// import performanceRoutes from './routes/performance.js';
// import alertRoutes from './routes/alerts.js';
// import insightRoutes from './routes/insights.js';
// import reportRoutes from './routes/reports.js';
// import emojiResponseRoutes from './routes/emojiResponse.js';
// import emailDispatchRoutes from './routes/emailDispatch.js';
// import mlInsightRoutes from './routes/mlInsights.js';
// import leaveRoutes from './routes/leave.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// const predictor = new EmployeePredictor();

// app.use(cors());
// app.use(json());

// const connectDB = async () => {
//   try {
//     await connect('mongodb://localhost:27017/hrdashboard', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// import Leave from './models/Leave.js';
// import Performance from './models/Performance.js';

// async function trainModels() {
//   try {
//     console.log('Starting model training...');
//     const performanceData = await Performance.find();
//     const leaveData = await Leave.find();
    
//     if (!performanceData.length || !leaveData.length) {
//       console.warn('No data available for training models');
//       return;
//     }

//     await predictor.trainLeaveModel(leaveData);
//     await predictor.trainBurnoutModel(performanceData);
//     console.log('Models trained successfully');
//   } catch (error) {
//     console.error('Error training models:', error);
//   }
// }

// const initializeApp = async () => {
//   await connectDB();
//   await trainModels();
// };

// app.use('/api/employees', employeeRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/performance', performanceRoutes);
// app.use('/api/alerts', alertRoutes);
// app.use('/api/insights', insightRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/emoji-response', emojiResponseRoutes);
// app.use('/api/email-dispatch', emailDispatchRoutes);
// app.use('/api/ml-insights', mlInsightRoutes);
// app.use('/api/leave', leaveRoutes);

// app.post('/api/ml/predict_leave', async (req, res) => {
//   try {
//     const { task_completion_rate, workload, burnout_level } = req.body;
//     const inputData = [task_completion_rate, workload, burnout_level];
//     const prediction = await predictor.predictLeave(inputData);
//     res.json({ prediction });
//   } catch (error) {
//     console.error('Prediction error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/ml/predict_burnout', async (req, res) => {
//   try {
//     const { task_completion_rate, workload, performance_score } = req.body;
//     const inputData = [task_completion_rate, workload, performance_score];
//     const prediction = await predictor.predictBurnout(inputData);
//     res.json({ prediction });
//   } catch (error) {
//     console.error('Prediction error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/ml/peak_leave_periods', async (req, res) => {
//   try {
//     const leaveData = await Leave.find();
//     if (!leaveData.length) {
//       return res.status(404).json({ error: 'No leave data available' });
//     }
//     const peakPeriod = predictor.identifyPeakLeavePeriods(leaveData);
//     res.json({ peak_period: peakPeriod });
//   } catch (error) {
//     console.error('Peak leave period error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/ml/suggest_interventions', (req, res) => {
//   try {
//     const suggestions = predictor.suggestInterventions(req.body);
//     res.json({ suggestions });
//   } catch (error) {
//     console.error('Intervention suggestion error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.use(express.static(path.join(__dirname, 'frontend/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Something went wrong!',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// const PORT = process.env.PORT || 5000;

// initializeApp().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(error => {
//   console.error('Failed to initialize application:', error);
//   process.exit(1);
// });

// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Promise rejection:', err);
//   process.exit(1);
// });

