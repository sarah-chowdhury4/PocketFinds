import Customer from '../models/customer.model.js';
import Stall from '../models/stall.model.js';

// Get notifications for logged-in user - computed on-the-fly from bookmarked stalls (GET)
const getUserNotifications = async (req, res) => {
    try {
        const user_id = req.user._id;
        
        // Get customer with bookmarks
        const customer = await Customer.findById(user_id).select('bookmark noti_on');
        
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        
        // If notifications are off, return empty
        if (!customer.noti_on) {
            return res.status(200).json({
                notifications: [],
                message: 'Notifications are turned off'
            });
        }
        
        // Get all bookmarked stalls that have active discounts
        const stalls = await Stall.find({
            _id: { $in: customer.bookmark },
            discount: { $gt: 0 }
        }).select('stall_name discount discount_items stall_location');
        
        // Generate notifications from current discounts
        const notifications = stalls.map(stall => ({
            stall_id: stall._id,
            stall_name: stall.stall_name,
            message: `${stall.stall_name} has ${stall.discount}% discount${stall.discount_items ? ' on ' + stall.discount_items : ''}!`,
            discount: stall.discount,
            stall_location: stall.stall_location
        }));
        
        return res.status(200).json({
            notifications,
            total: notifications.length
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch notifications: ' + error.message });
    }
};


export { 
    getUserNotifications
};
