import express from 'express';
import { classifyWaste } from '../controllers/wasteController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/classify', upload.single('image'), classifyWaste);

export default router;
