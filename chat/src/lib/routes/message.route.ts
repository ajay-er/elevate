import express from 'express';
import { messageController } from '../controllers/message.controlller';

const router = express.Router();


router.get('/api/v1/chat/add', messageController.get);
router.get('/api/v1/chat/get', messageController.get);


export { router as messageRoute };
