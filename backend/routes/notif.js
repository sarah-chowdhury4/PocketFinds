import express from 'express';
import { getUserNotifications } from '../controllers/notifController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

// Get user's notifications 
router.get('/', getUserNotifications);

export default router;
