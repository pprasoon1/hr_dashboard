import { Schema, model } from 'mongoose';

const LeaveSchema = new Schema({
  employee_id: {
    type: String,
    required: true
  },
  leave_date: {
    type: Date,
    required: true
  },
  leave_duration: {
    type: Number,
    required: true
  }
});

export default model('Leave', LeaveSchema);

