import express from 'express';
import { sendMessage } from '../controllers/sendMessageController.js';

const router = express.Router();

router.post('/', sendMessage);
// router.post('/personalized', sendMessage);

export default router;