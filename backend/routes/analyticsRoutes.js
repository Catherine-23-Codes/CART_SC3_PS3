import express from 'express';
import { getAnalytics, getHotspots, getImpactStats } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/analytics', getAnalytics);
router.get('/hotspots', getHotspots);
router.get('/impact', getImpactStats);

export default router;
