import express from 'express';
import { predictWaste } from '../controllers/predictController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/predict', uploadMiddleware.single('image'), predictWaste);

export default router;
