import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import AdminController from '../controllers/adminController.js';
import CustomerController from '../controllers/customerController.js';
import StallOwnerController from '../controllers/stallOwnerController.js';

const router = express.Router();

router.get('/admin', requireAuth, requireRole('admin'), AdminController.getDashboard);
router.get('/customer', requireAuth, requireRole('customer'), CustomerController.getDashboard);
router.get('/stall-owner', requireAuth, requireRole('stall owner'), StallOwnerController.getDashboard);

// Customer actions
router.post('/customer/favorite', requireAuth, requireRole('customer'), CustomerController.toggleFavorite);
router.get('/customer/favorites', requireAuth, requireRole('customer'), CustomerController.getFavorites);

export default router;
