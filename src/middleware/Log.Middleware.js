import logger from '../utils/Logger.util.js';

// Middleware to log incoming HTTP requests and their responses, including timing and status
export const logRequest = (req, res, next) => {
  const { method, originalUrl } = req;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const start = process.hrtime();

  // Log the incoming request details
  logger.info(`[REQUEST] ${method} ${originalUrl} - IP: ${ip}`);

  // Listen for the finish event on response to log when request processing completes
  res.once('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);
    const statusCode = res.statusCode;

    // Check for error message in response locals or body
    const error = res.locals?.error || res.body?.error;
    const statusText = error ? `Error: ${error}` : `Status: ${statusCode}`;
    const message = `[RESPONSE] ${method} ${originalUrl} - ${statusText} - Time: ${durationMs}ms`;

    // Log error messages with error level, others with info level
    if (statusCode >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  });

  next();
};
