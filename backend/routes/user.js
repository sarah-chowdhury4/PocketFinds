import express from 'express';

// controller functions import
import { loginUser, signupUser } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// logout route
router.post('/signup', signupUser);

export default router;