import express from 'express';
import {
  createStall,
  getAllStalls,
  getStallById,
  getStallByOwner,
  updateStall,
  deleteStall,
} from '../controllers/stallController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllStalls);
router.get('/:id', getStallById);

// Protected routes (stall owner only)
router.post('/', requireAuth, requireRole('stall owner'), createStall);
router.get('/owner/my-stall', requireAuth, requireRole('stall owner'), getStallByOwner);
router.put('/:id', requireAuth, requireRole('stall owner'), updateStall);
router.delete('/:id', requireAuth, requireRole('stall owner'), deleteStall);

export default router;
