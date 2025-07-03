import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';
import passport from '../middlewares/auth.js'; // OAuth setup is exported from here

const router = express.Router();

// Traditional Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserProfile);

router.get('/google', passport.authenticate('google', {
  scope: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/gmail.readonly' // 🆕 Add this!
  ],
  accessType: 'offline',
  prompt: 'consent', // 🆕 to ensure refresh token is issued
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = req.user.token;
    const googleToken = req.user.accessToken;
    const role = req.user.user.role;

    res.redirect(`http://localhost:5000/sendToken.html?jwt=${token}&googleToken=${googleToken}&role=${role}`);
  }
);




export default router;
