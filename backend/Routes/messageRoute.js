import express from 'express';
const messageRouter=express.Router();
import { sendMessage, getMessage } from '../Controllers/messageController.js';
import isLogin from '../middleware/isLogin.js';

messageRouter.post('/send/:id', isLogin , sendMessage)
messageRouter.get('/:id', isLogin, getMessage)

export default messageRouter;