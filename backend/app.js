import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import predictRoutes from './routes/predictRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import infoRoutes from './routes/infoRoutes.js';

import wasteRoutes from './routes/wasteRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import centerRoutes from './routes/centerRoutes.js';
import ecoRoutes from './routes/ecoRoutes.js';
import heatmapRoutes from './routes/heatmapRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', predictRoutes);
app.use('/api', infoRoutes);
app.use('/api/dashboard', dashboardRoutes); // Mounting dashboard stats under /api/dashboard

// New DB-driven API structure mounted
app.use('/api', wasteRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', centerRoutes);
app.use('/api', ecoRoutes);
app.use('/api', heatmapRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: "EcoSort AI Backend Running" });
});

export default app;
