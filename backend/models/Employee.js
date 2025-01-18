import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  performance_score: {
    type: Number,
    required: true
  }
});

export default model('Employee', EmployeeSchema);

