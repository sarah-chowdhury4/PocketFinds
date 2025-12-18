import express from 'express';

// controller functions import
import { loginUser, signupUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// profile routes
router.get('/profile', requireAuth, getUserProfile);
router.put('/profile', requireAuth, updateUserProfile);

export default router;