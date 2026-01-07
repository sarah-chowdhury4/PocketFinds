import Customer from '../models/customer.model.js';
import Stall from '../models/stall.model.js';
import Feedback from '../models/feedback.model.js';

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.uid;
        
        // Get customer data
        const customer = await Customer.findById(userId).select('-password');
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Count bookmarked stalls
        const bookmarkedCount = customer.bookmark ? customer.bookmark.length : 0;

        // Get all stalls count (for "nearby stalls")
        const totalStalls = await Stall.countDocuments();

        // Count reviews given by this customer
        const reviewsGiven = await Feedback.countDocuments({ customer_id: userId });

        // Get recent bookmarked stalls with details
        const recentBookmarks = await Stall.find({
            _id: { $in: customer.bookmark || [] }
        })
        .limit(5)
        .sort({ createdAt: -1 })
        .populate('owner_id', 'first_name last_name');

        // Get recent activity - combine bookmarks and reviews
        const recentFeedback = await Feedback.find({ customer_id: userId })
            .limit(5)
            .sort({ createdAt: -1 })
            .populate('stall_id', 'stall_name');

        // Create activity array with bookmarks
        const activities = [];
        
        // Add recent bookmarks
        for (const stall of recentBookmarks.slice(0, 2)) {
            activities.push({
                type: 'bookmark',
                message: `Bookmarked "${stall.stall_name}"`,
                timestamp: stall.createdAt
            });
        }
        
        // Add recent reviews
        for (const fb of recentFeedback.slice(0, 2)) {
            activities.push({
                type: 'review',
                message: `Left a review for "${fb.stall_id?.stall_name || 'Unknown Stall'}"`,
                rating: fb.rating,
                timestamp: fb.createdAt
            });
        }
        
        // Sort by most recent and take top 3
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const recentActivity = activities.slice(0, 3);

        return res.status(200).json({
            stats: {
                bookmarkedStalls: bookmarkedCount,
                recentVisits: recentFeedback.length,
                stallsNearby: totalStalls,
                reviewsGiven: reviewsGiven
            },
            recentBookmarks: recentBookmarks,
            recentActivity: recentActivity.length > 0 ? recentActivity : [{
                type: 'welcome',
                message: 'Welcome! Start exploring stalls and leave reviews',
                timestamp: new Date()
            }]
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch dashboard data: ' + error.message });
    }
};

export default { getDashboard };
