import fs from 'fs';
import { getPredictionFromModel } from '../services/aiPredictionService.js';
import { incrementWasteCount, incrementRecyclable, addCO2Saved } from '../dashboard/statsStore.js';
import { logInfo, logError } from '../utils/logger.js';

export const predictWaste = async (req, res) => {
  try {
    if (!req.file) {
      logError("Image upload failed: No image provided");
      return res.status(400).json({ error: 'Image upload failed: No image provided' });
    }

    logInfo(`Processing uploaded image: ${req.file.path}`);

    // Call AI prediction service using the temp file path
    const predictionResult = await getPredictionFromModel(req.file.path);

    // Update dashboard statistics
    incrementWasteCount(predictionResult.class);
    
    // Simple logic: say Plastic, Paper, Metal, Glass are recyclable
    if (['Plastic', 'Paper', 'Metal', 'Glass'].includes(predictionResult.class)) {
      incrementRecyclable();
      addCO2Saved(Math.random() * 2); // Save some arbitrary CO2 value per item
    }

    // Return JSON response to frontend
    res.json({
      class: predictionResult.class,
      confidence: predictionResult.confidence
    });

  } catch (error) {
    logError(`Prediction controller error: ${error.message}`);
    res.status(503).json({ error: error.message || 'AI model is unavailable' });
  } finally {
    // Clean up temporary image
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        logInfo(`Deleted temporary file: ${req.file.path}`);
      } catch (err) {
        logError(`Failed to delete temp file: ${err.message}`);
      }
    }
  }
};
