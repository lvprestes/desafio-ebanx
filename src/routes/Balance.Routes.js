import express from 'express';
import { getBalance } from '../controller/Balance.Controller.js';

const router = express.Router();

router.get('/', getBalance);

export default router;