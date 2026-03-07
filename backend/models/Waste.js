import mongoose from 'mongoose';

const wasteSchema = new mongoose.Schema({
  image: { type: String, required: true },
  category: { type: String, required: true },
  confidence: { type: Number, required: true },
  location: { type: String, default: 'Unknown' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Waste', wasteSchema);
