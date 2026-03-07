import express from 'express';
import { getHeatmapData } from '../controllers/heatmapController.js';

const router = express.Router();

router.get('/heatmap', getHeatmapData);

export default router;
