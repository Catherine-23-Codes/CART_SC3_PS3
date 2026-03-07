import express from 'express';
import { getStats } from '../dashboard/statsStore.js';
import { logInfo } from '../utils/logger.js';

const router = express.Router();

router.get('/stats', (req, res) => {
  logInfo("Dashboard stats requested");
  const stats = getStats();
  res.json(stats);
});

export default router;
