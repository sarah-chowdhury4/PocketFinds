import StallOwner from '../models/stallOwner.model.js';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';
import Feedback from '../models/feedback.model.js';
import Customer from '../models/customer.model.js';

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.uid;
        
        // Get stall owner data
        const stallOwner = await StallOwner.findById(userId).select('-password');
        if (!stallOwner) {
            return res.status(404).json({ error: 'Stall owner not found' });
        }

        // Get stalls owned by this user
        const stalls = await Stall.find({ owner_id: userId });
        const stallIds = stalls.map(s => s._id);

        // Count menu items across all stalls
        const menuItemsCount = await Item.countDocuments({ stall_id: { $in: stallIds } });

        // Get average rating from feedback
        const feedbacks = await Feedback.find({ stall_id: { $in: stallIds } });
        const avgRating = feedbacks.length > 0
            ? (feedbacks.reduce((sum, fb) => sum + (fb.ratings || 0), 0) / feedbacks.length).toFixed(1)
            : 0;

        // Count total bookmarks across all stalls
        const bookmarkCount = await Customer.countDocuments({
            bookmark: { $in: stallIds }
        });

        // Get recent feedback as activity
        const recentFeedback = await Feedback.find({ stall_id: { $in: stallIds } })
            .limit(3)
            .sort({ createdAt: -1 })
            .populate('stall_id', 'stall_name')
            .populate('customer_id', 'first_name last_name');

        return res.status(200).json({
            stats: {
                totalMenuItems: menuItemsCount,
                avgRating: parseFloat(avgRating),
                totalBookmarks: bookmarkCount,
                totalReviews: feedbacks.length
            },
            stalls: stalls,
            recentActivity: recentFeedback.map(fb => ({
                type: 'review',
                message: `New review on ${fb.stall_id?.stall_name || 'your stall'} by ${fb.customer_id?.first_name || 'Customer'}`,
                rating: fb.ratings,
                timestamp: fb.createdAt
            }))
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch dashboard data: ' + error.message });
    }
};

export default { getDashboard };
