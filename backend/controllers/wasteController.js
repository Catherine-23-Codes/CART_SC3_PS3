import { getPredictionFromModel } from '../services/aiPredictionService.js';
import { logInfo, logError } from '../utils/logger.js';
import { incrementWasteCount } from '../dashboard/statsStore.js';
import db from '../config/db.js';
import fs from 'fs';

export const classifyWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    logInfo(`Processing image: ${req.file.filename}`);

    // Get Prediction from Python API (or mock fallback if API isn't running)
    const predictionResult = await getPredictionFromModel(req.file.path);
    const { class: category, confidence } = predictionResult;

    // Save to Local Data Store
    db.get('wastes')
      .push({
          id: Date.now().toString(),
          image: req.file.filename,
          category,
          confidence,
          location: req.body.location || 'Unknown',
          timestamp: new Date().toISOString()
      })
      .write();
    
    // Also optionally update internal simple counter for backwards compatibility
    incrementWasteCount(category);

    // Provide tip logic (same logic as infoRoutes)
    const tipMap = {
      'Plastic': 'Clean plastic before recycling, rinse bottles.',
      'Paper': 'Keep clean and dry, flatten boxes.',
      'Glass': 'Rinse out food residue.',
      'Metal': 'Crush cans to save space.',
      'Organic': 'Compost at home if possible.',
      'E-Waste': 'Take to specialized e-waste collection centers.',
      'Non-Recyclable': 'Ensure this goes to general waste/landfill.'
    };
    const tip = tipMap[category] || 'Check local guidelines.';

       // Clean up temporary file safely in the background
    if (req.file && req.file.path) {
      fs.access(req.file.path, fs.constants.F_OK, (accessErr) => {
        if (!accessErr) {
          // File exists, delete it in the background
          fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) logError(`Error deleting temp file: ${unlinkErr.message}`);
          });
        }
      });
    }
  

    res.json({
      category,
      confidence: confidence,
      tip: tip
    });

  } catch (error) {
    logError(`Classification error: ${error.message}`);
    res.status(500).json({ error: 'Server prediction failed' });
  }
};
