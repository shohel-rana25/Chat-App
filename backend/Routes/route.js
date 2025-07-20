import express from 'express';
import multer from 'multer';
import { getmethod, loginUser, logoutUser, registerUser } from '../Controllers/authController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/register', upload.single('profilePhoto'), registerUser);

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/', getmethod);

export default router;
