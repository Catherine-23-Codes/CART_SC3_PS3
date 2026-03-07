import express from 'express';
import { getAllCenters } from '../controllers/centerController.js';

const router = express.Router();

router.get('/recycling-centers', getAllCenters);

export default router;
