import mongoose from 'mongoose';

const ecoPointsSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Simple string tracking for prototype instead of ObjectId to prevent complications
  points: { type: Number, required: true },
  action: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('EcoPoints', ecoPointsSchema);
