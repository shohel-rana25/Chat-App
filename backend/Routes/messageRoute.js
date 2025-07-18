import express from 'express';
const messageRouter=express.Router();
import sendMessage from '../Controllers/messageController.js';
import isLogin from '../middleware/isLogin.js';

messageRouter.post('/send/:id', isLogin , sendMessage)


export default messageRouter;