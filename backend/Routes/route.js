import express from 'express'
import { getmethod, loginUser, logoutUser, registerUser } from '../Controllers/authController.js'
const router=express.Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/', getmethod);

export default router;

