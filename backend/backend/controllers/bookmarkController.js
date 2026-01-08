import Customer from '../models/customer.model.js';
import Stall from '../models/stall.model.js';

// Add bookmark (POST)
const addBookmark = async (req, res) => {
    try {
        const stall_id = req.body?.stallId || req.body?.stall_id;
        const user_id = req.user?.uid || req.user?.userId;

        if (!stall_id) {
            return res.status(400).json({ error: 'stallId is required' });
        }

        if (!user_id) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        // Verify stall exists
        const stall = await Stall.findById(stall_id);
        if (!stall) {
            return res.status(404).json({ error: 'Stall not found' });
        }
        
        // Find customer
        const customer = await Customer.findById(user_id);
        if (!customer || customer.type !== 'customer') {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        // Check if already bookmarked
        if (customer.bookmark.includes(stall_id)) {
            return res.status(400).json({ error: 'Stall already bookmarked' });
        }
        
        // Add to bookmark array
        customer.bookmark.push(stall_id);
        await customer.save();
        
        return res.status(200).json({
            message: 'Stall bookmarked successfully',
            bookmark: customer.bookmark
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add bookmark: ' + error.message });
    }
};

// Remove bookmark (DELETE)
const removeBookmark = async (req, res) => {
    try {
        const { stall_id } = req.params;
        const user_id = req.user?.uid || req.user?.userId;

        if (!user_id) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        // Find customer and remove stall_id from bookmark array
        const customer = await Customer.findByIdAndUpdate(
            user_id,
            { $pull: { bookmark: stall_id } },
            { new: true }
        );
        
        if (!customer || customer.type !== 'customer') {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        return res.status(200).json({
            message: 'Bookmark removed successfully',
            bookmark: customer.bookmark
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to remove bookmark: ' + error.message });
    }
};

// Get user's bookmarks with stall details (GET)
const getUserBookmarks = async (req, res) => {
    try {
        const user_id = req.user?.uid || req.user?.userId;

        if (!user_id) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        const customer = await Customer.findById(user_id).select('bookmark');
        if (!customer || customer.type !== 'customer') {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        // Get full stall details for all bookmarked stalls
        const stalls = await Stall.find({
            _id: { $in: customer.bookmark }
        }).populate('owner_id', 'first_name last_name');
        
        return res.status(200).json({
            bookmarks: customer.bookmark,
            stalls: stalls
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch bookmarks: ' + error.message });
    }
};

// Toggle notification preference (PUT)
const toggleNotifications = async (req, res) => {
    try {
        const user_id = req.user?.uid || req.user?.userId;

        if (!user_id) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const { noti_on } = req.body;
        
        const customer = await Customer.findByIdAndUpdate(
            user_id,
            { noti_on: noti_on },
            { new: true }
        ).select('noti_on');
        
        if (!customer || customer.type !== 'customer') {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        return res.status(200).json({
            message: `Notifications ${customer.noti_on ? 'enabled' : 'disabled'}`,
            noti_on: customer.noti_on
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update notification preference: ' + error.message });
    }
};

export { 
    addBookmark, 
    removeBookmark, 
    getUserBookmarks,
    toggleNotifications 
};
