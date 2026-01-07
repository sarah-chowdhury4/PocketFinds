import express from 'express';
import Stall from '../models/stall.model.js';
import uploadStallImage from '../middleware/uploadStallImage.js';
import { createStall, deleteStall, updateStall, updateStallCoordinates, getStallAnalytics, getAllStalls, getStallDetails, getMyStalls } from '../controllers/stallController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Get all stalls (public)
router.get('/', getAllStalls);

// Get my stalls (stall owner only)
router.get('/my-stalls', requireAuth, requireRole('stall owner'), getMyStalls);

// Get stall details (public)
router.get('/:stallId', getStallDetails);

// Update stall coordinates (admin or owner)
router.patch('/:stallId/coordinates', requireAuth, updateStallCoordinates);

// Stall analytics (owner or admin)
router.get('/:stallId/analytics', requireAuth, getStallAnalytics);

// Create a new stall (with optional image upload)
router.post('/create', requireAuth, requireRole('stall owner'), uploadStallImage.single('stall_image'), createStall);

// Update a stall
router.put('/:stallId', requireAuth, requireRole('stall owner'), uploadStallImage.single('stall_image'), updateStall);

// Delete a stall (owner or admin)
router.delete('/:stallId', requireAuth, deleteStall);

export default router;