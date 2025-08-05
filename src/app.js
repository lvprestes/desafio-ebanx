import express from 'express';
import dotenv from 'dotenv';

import { logRequest } from './middleware/Log.Middleware.js';
import { corsMiddleware } from './middleware/Cors.Middleware.js';

import balanceRoutes from './routes/Balance.Routes.js';
import eventRoutes from './routes/Event.Routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(logRequest);
app.use(corsMiddleware);

app.use('/balance', balanceRoutes);
app.use('/event', eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
