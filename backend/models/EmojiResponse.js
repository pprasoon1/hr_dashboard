import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const EmojiResponseSchema = new Schema({
  employee_id: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
    enum: ['😊', '😐', '😟'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: ['daily', 'weekly'],
  },
});

const EmojiResponse = mongoose.models.EmojiResponse || mongoose.model('EmojiResponse', EmojiResponseSchema);
export default EmojiResponse;
