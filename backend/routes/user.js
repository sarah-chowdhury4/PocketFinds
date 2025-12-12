import express from 'express';

// controller functions import
import { loginUser, signupUser, getCurrentUser, updateProfile } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// logout route
router.post('/signup', signupUser);

// get current user route (protected)
router.get('/me', requireAuth, getCurrentUser);

// update profile route (protected)
router.patch('/profile', requireAuth, updateProfile);

export default router;
