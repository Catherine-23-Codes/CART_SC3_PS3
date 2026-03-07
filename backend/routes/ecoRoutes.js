import express from 'express';
import { getUserPoints, addPoints, getLeaderboard } from '../controllers/ecoController.js';

const router = express.Router();

router.get('/eco-points', getUserPoints);
router.post('/add-points', addPoints);
router.get('/leaderboard', getLeaderboard);

export default router;
