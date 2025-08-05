import { createLogger, transports, format } from 'winston';

// Create and configure a Winston logger instance
const logger = createLogger({
  level: 'info',
  // Define the log message format: timestamp + uppercase level + message
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level.toUpperCase()}] ${message}`) // Custom log message format
  ),
  // Logs go to the console
  transports: [
    new transports.Console()
  ],
});

export default logger;
