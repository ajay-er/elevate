import express from 'express';
import { messageController } from '../controllers/message.controlller';
import { requireAuth } from '@ajay404/elevate';

const router = express.Router();

router.get('/api/v1/chat/chatList',requireAuth,messageController.chatList);

router.get('/api/v1/chat/history/:participantId',requireAuth,messageController.chatHistory);

export { router as messageRoute };
