import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
