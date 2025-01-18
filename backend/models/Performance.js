import { Schema, model } from 'mongoose';

const PerformanceSchema = new Schema({
  employee_id: {
    type: String,
    required: true
  },
  task_completion_rate: {
    type: Number,
    required: true
  },
  performance_score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  workload: {
    type: Number,
    required: true
  },
  burnout_level: {
    type: Number,
    required: true
  }
});

export default model('Performance', PerformanceSchema);

