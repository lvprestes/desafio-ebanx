import express from 'express';
import { logRequest } from './middleware/Log.Middleware.js';
import { corsMiddleware } from './middleware/Cors.Middleware.js';
import { errorMiddleware } from './middleware/Error.Middleware.js';

import balanceRoutes from './routes/Balance.Routes.js';
import eventRoutes from './routes/Event.Routes.js';
import resetRoute from './routes/Reset.Routes.js';

const app = express();

// Initialize middlewares
app.use(express.json());
app.use(logRequest);
app.use(corsMiddleware);
app.use(errorMiddleware);

// Initialize routes
app.use('/balance', balanceRoutes);
app.use('/event', eventRoutes);
app.use('/reset', resetRoute);

app.use('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the Ebanx Challenge API',
  });
});

export default app;
