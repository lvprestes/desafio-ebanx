import dotenv from 'dotenv';
import app from './src/app.js';

// Load environment variables from .env
dotenv.config();

// Set the port from environment variables or default
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
