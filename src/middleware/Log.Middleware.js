import logger from '../utils/Logger.util.js';
 
export const logRequest = (req, res, next) => {
  const { method, originalUrl } = req;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const start = process.hrtime();

  logger.info(`[REQUEST] ${method} ${originalUrl} - IP: ${ip}`);

  res.once('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);
    const statusCode = res.statusCode;
    const error = res.locals?.error || res.body?.error;
    const statusText = error ? `Error: ${error}` : `Status: ${statusCode}`;
    const message = `[RESPONSE] ${method} ${originalUrl} - ${statusText} - Time: ${durationMs}ms`;

    if (statusCode >= 400) {
      logger.error(message);
    } else {
      logger.info(message);
    }
  });

  next();
};
