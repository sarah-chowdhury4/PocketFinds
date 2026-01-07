import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import AdminController from '../controllers/adminController.js';
import CustomerController from '../controllers/customerController.js';
import StallOwnerController from '../controllers/stallOwnerController.js';

const router = express.Router();

// Dashboard routes
router.get('/admin', requireAuth, requireRole('admin'), AdminController.getDashboard);
router.get('/customer', requireAuth, requireRole('customer'), CustomerController.getDashboard);
router.get('/stall-owner', requireAuth, requireRole('stall owner'), StallOwnerController.getDashboard);

// Admin stall owner verification routes
router.get('/admin/stall-owners/pending', requireAuth, requireRole('admin'), AdminController.getPendingStallOwners);
router.get('/admin/stall-owners/verified', requireAuth, requireRole('admin'), AdminController.getVerifiedStallOwners);
router.put('/admin/stall-owners/:ownerId/verify', requireAuth, requireRole('admin'), AdminController.verifyStallOwner);
router.put('/admin/stall-owners/:ownerId/revoke', requireAuth, requireRole('admin'), AdminController.revokeStallOwnerVerification);

// Admin stall reports and ban routes
router.get('/admin/stalls/reported', requireAuth, requireRole('admin'), AdminController.getReportedStalls);
// router.put('/admin/stalls/:stallId/ban', requireAuth, requireRole('admin'), AdminController.banStall);
// router.put('/admin/stalls/:stallId/unban', requireAuth, requireRole('admin'), AdminController.unbanStall);
export default router;