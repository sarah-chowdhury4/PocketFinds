import Feedback from '../models/feedback.model.js';
import Stall from '../models/stall.model.js';
import { updateCustomerTrustPoints } from '../utils/trustPointsCalculator.js';

// Helper to check if user is a stall owner
const isStallOwner = (user) => {
    return user?.role === 'stall owner' || user?.type === 'stall owner';
};

// Upvote a review
export const upvoteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.uid;
        
        // Check if user is a stall owner - they cannot vote
        if (isStallOwner(req.user)) {
            return res.status(403).json({ error: 'Stall owners cannot vote on reviews' });
        }
        
        const review = await Feedback.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        
        // Check if user already upvoted - toggle off (remove upvote)
        const upvoteIndex = review.upvoted_by.indexOf(userId);
        if (upvoteIndex > -1) {
            review.upvoted_by.splice(upvoteIndex, 1);
            review.upvote_count = Math.max(0, (review.upvote_count || 0) - 1);
            await review.save();
            
            // Recalculate trust points for the review author
            await updateCustomerTrustPoints(review.customer_id);
            
            return res.status(200).json({ 
                message: 'Upvote removed successfully',
                upvote_count: review.upvote_count,
                downvote_count: review.downvote_count,
                action: 'removed'
            });
        }
        
        // Remove from downvoted if previously downvoted
        const downvoteIndex = review.downvoted_by.indexOf(userId);
        if (downvoteIndex > -1) {
            review.downvoted_by.splice(downvoteIndex, 1);
            review.downvote_count = Math.max(0, (review.downvote_count || 0) - 1);
        }
        
        // Add upvote
        review.upvoted_by.push(userId);
        review.upvote_count = (review.upvote_count || 0) + 1;
        await review.save();
        
        // Recalculate trust points for the review author
        await updateCustomerTrustPoints(review.customer_id);
        
        res.status(200).json({ 
            message: 'Review upvoted successfully',
            upvote_count: review.upvote_count,
            downvote_count: review.downvote_count,
            action: 'added'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Downvote a review
export const downvoteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.uid;
        
        // Check if user is a stall owner - they cannot vote
        if (isStallOwner(req.user)) {
            return res.status(403).json({ error: 'Stall owners cannot vote on reviews' });
        }
        
        const review = await Feedback.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        
        // Check if user already downvoted - toggle off (remove downvote)
        const downvoteIndex = review.downvoted_by.indexOf(userId);
        if (downvoteIndex > -1) {
            review.downvoted_by.splice(downvoteIndex, 1);
            review.downvote_count = Math.max(0, (review.downvote_count || 0) - 1);
            await review.save();
            
            // Recalculate trust points for the review author
            await updateCustomerTrustPoints(review.customer_id);
            
            return res.status(200).json({ 
                message: 'Downvote removed successfully',
                upvote_count: review.upvote_count,
                downvote_count: review.downvote_count,
                action: 'removed'
            });
        }
        
        // Remove from upvoted if previously upvoted
        const upvoteIndex = review.upvoted_by.indexOf(userId);
        if (upvoteIndex > -1) {
            review.upvoted_by.splice(upvoteIndex, 1);
            review.upvote_count = Math.max(0, (review.upvote_count || 0) - 1);
        }
        
        // Add downvote
        review.downvoted_by.push(userId);
        review.downvote_count = (review.downvote_count || 0) + 1;
        await review.save();
        
        // Recalculate trust points for the review author
        await updateCustomerTrustPoints(review.customer_id);
        
        res.status(200).json({ 
            message: 'Review downvoted successfully',
            upvote_count: review.upvote_count,
            downvote_count: review.downvote_count,
            action: 'added'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Report a review
export const reportReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { reason } = req.body;
        const userId = req.user.uid;
        
        // Check if user is a stall owner - they cannot report reviews
        if (isStallOwner(req.user)) {
            return res.status(403).json({ error: 'Stall owners cannot report reviews' });
        }
        
        if (!reason || reason.trim() === '') {
            return res.status(400).json({ error: 'Report reason is required' });
        }
        
        const review = await Feedback.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        
        // Check if user already reported this review
        const alreadyReported = review.reported_by.some(
            report => report.user_id.toString() === userId.toString()
        );
        if (alreadyReported) {
            return res.status(400).json({ error: 'You have already reported this review' });
        }
        
        // Add report
        review.reported_by.push({
            user_id: userId,
            reason: reason.trim(),
            reported_at: new Date()
        });
        review.report_count = (review.report_count || 0) + 1;
        await review.save();
        
        res.status(200).json({ 
            message: 'Review reported successfully',
            report_count: review.report_count
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { stall_id, review, ratings } = req.body;
        const customer_id = req.user.uid;
        
        // Only customers can create reviews
        if (isStallOwner(req.user)) {
            return res.status(403).json({ error: 'Stall owners cannot write reviews' });
        }
        
        if (!stall_id || !review || !ratings) {
            return res.status(400).json({ error: 'stall_id, review, and ratings are required' });
        }
        
        // Check if stall exists
        const stall = await Stall.findById(stall_id);
        if (!stall) {
            return res.status(404).json({ error: 'Stall not found' });
        }
        
        const newReview = await Feedback.create({
            customer_id,
            stall_id,
            review,
            ratings,
            upvote_count: 0,
            downvote_count: 0,
            upvoted_by: [],
            downvoted_by: [],
            reported_by: [],
            report_count: 0,
            flags: []
        });
        
        // Populate customer info
        await newReview.populate('customer_id', 'first_name last_name');
        
        // Initial trust points calculation
        await updateCustomerTrustPoints(customer_id);
        
        res.status(201).json({ 
            message: 'Review created successfully',
            review: newReview 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews for a stall (public - no auth required)
export const getStallReviews = async (req, res) => {
    try {
        const { stallId } = req.params;
        
        const reviews = await Feedback.find({ stall_id: stallId })
            .populate('customer_id', 'first_name last_name')
            .sort({ createdAt: -1 });
        
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get customer's own reviews with stall info
export const getMyReviews = async (req, res) => {
    try {
        const customer_id = req.user.uid;
        
        const reviews = await Feedback.find({ customer_id })
            .populate('stall_id', 'stall_name stall_location stall_image')
            .sort({ createdAt: -1 });
        
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user's vote status for reviews (to show which they've already voted on)
export const getMyVotes = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { reviewIds } = req.body;
        
        if (!reviewIds || !Array.isArray(reviewIds)) {
            return res.status(400).json({ error: 'reviewIds array is required' });
        }
        
        const reviews = await Feedback.find({ _id: { $in: reviewIds } });
        
        const votes = {};
        reviews.forEach(review => {
            votes[review._id] = {
                upvoted: review.upvoted_by.includes(userId),
                downvoted: review.downvoted_by.includes(userId),
                reported: review.reported_by.some(r => r.user_id.toString() === userId.toString())
            };
        });
        
        res.status(200).json({ votes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
