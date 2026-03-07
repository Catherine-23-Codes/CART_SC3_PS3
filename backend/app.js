import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import predictRoutes from './routes/predictRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', predictRoutes);

app.get('/', (req, res) => {
  res.json({ message: "EcoSort AI Backend Running" });
});

export default app;
