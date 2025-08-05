import express from 'express';

import { handleResetReq } from '../controller/Balance.Controller.js';

const router = express.Router();

router.post('/', handleResetReq);

export default router;