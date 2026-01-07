import express from 'express';
import { 
    upvoteReview, 
    downvoteReview, 
    reportReview,
    createReview, 
    getStallReviews,
    getMyReviews,
    getMyVotes
} from '../controllers/reviewController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public route - Get reviews for a specific stall (no auth required)
router.get('/stall/:stallId', getStallReviews);

// Protected routes - require authentication
// Create a new review (customers only - checked in controller)
router.post('/', requireAuth, createReview);

// Get my reviews
router.get('/my-reviews', requireAuth, getMyReviews);

// Get my vote status for specific reviews
router.post('/my-votes', requireAuth, getMyVotes);

// Upvote a review (customers only - checked in controller)
router.post('/:reviewId/upvote', requireAuth, upvoteReview);

// Downvote a review (customers only - checked in controller)
router.post('/:reviewId/downvote', requireAuth, downvoteReview);

// Report a review (customers only - checked in controller)
router.post('/:reviewId/report', requireAuth, reportReview);

export default router;
