import express from 'express';

import { handleEventReq } from '../controller/Event.Controller.js';

const router = express.Router();

router.post('/', handleEventReq);

export default router;