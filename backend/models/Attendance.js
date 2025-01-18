import { Schema, model } from 'mongoose';

const AttendanceSchema = new Schema({
  employee_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendance_status: {
    type: String,
    required: true
  }
});

export default model('Attendance', AttendanceSchema);

