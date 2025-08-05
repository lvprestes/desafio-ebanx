import { createLogger, transports, format } from 'winston';

// Create and configure a Winston logger instance
const logger = createLogger({
  // Set the minimum log level to 'info'
  level: 'info',
  // Define the log message format: timestamp + uppercase level + message
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp with custom format
    format.printf(({ level, message, timestamp }) => `[${timestamp}] [${level.toUpperCase()}] ${message}`) // Custom log message format
  ),
  // Define transports (where logs are sent) - here, logs go to the console
  transports: [
    new transports.Console()
  ],
});

export default logger;
