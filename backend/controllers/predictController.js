import { getPredictionFromAI } from '../config/aiService.js';

// Simple mock database for dashboard statistics
let dashboardStats = {
  totalScanned: 0,
  classes: {
    Plastic: 0,
    Paper: 0,
    Glass: 0,
    Organic: 0,
    Metal: 0
  }
};

export const predictWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image upload fails: No image provided' });
    }

    // Call AI prediction service
    const predictionResult = await getPredictionFromAI(req.file.buffer, req.file.originalname);

    // Update dashboard statistics
    dashboardStats.totalScanned += 1;
    if (dashboardStats.classes[predictionResult.class] !== undefined) {
       dashboardStats.classes[predictionResult.class] += 1;
    }

    // Return JSON response to frontend
    res.json({
      class: predictionResult.class,
      confidence: predictionResult.confidence,
      _stats: dashboardStats // Sending stats just for visibility
    });

  } catch (error) {
    console.error('Prediction controller error:', error);
    res.status(503).json({ error: error.message || 'AI model is unavailable' });
  }
};
