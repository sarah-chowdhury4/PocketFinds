import StallOwner from '../models/stallOwner.model.js';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';
import Feedback from '../models/feedback.model.js';
import Customer from '../models/customer.model.js';

const validateCoordinates = (lat, lng) => {
    // Allow explicit clearing
    const bothEmpty = (lat === null || lat === undefined || lat === '') && (lng === null || lng === undefined || lng === '');
    if (bothEmpty) return null; // handled as clear by caller

    const parsedLat = Number(lat);
    const parsedLng = Number(lng);

    const isValidLat = Number.isFinite(parsedLat) && parsedLat >= -90 && parsedLat <= 90;
    const isValidLng = Number.isFinite(parsedLng) && parsedLng >= -180 && parsedLng <= 180;

    if (!isValidLat || !isValidLng) {
        return undefined; // invalid
    }

    return { lat: parsedLat, lng: parsedLng };
};

// Get all stalls with pagination
const getAllStalls = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Only return active stalls (is_active is true or not set)
        const query = { is_active: { $ne: false } };
        
        const totalStalls = await Stall.countDocuments(query);
        const stalls = await Stall.find(query)
            .populate('owner_id', 'first_name last_name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        res.status(200).json({ 
            stalls,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalStalls / limit),
                totalStalls,
                hasMore: skip + stalls.length < totalStalls
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get stalls owned by current user
const getMyStalls = async (req, res) => {
    try {
        const owner_id = req.user.uid;
        
        const stalls = await Stall.find({ owner_id })
            .sort({ createdAt: -1 });
        
        res.status(200).json({ stalls });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get single stall details with menu and reviews
const getStallDetails = async (req, res) => {
    try {
        const { stallId } = req.params;
        
        const stall = await Stall.findById(stallId)
            .populate('owner_id', 'first_name last_name email');
        
        if (!stall) {
            return res.status(404).json({ error: 'Stall not found' });
        }
        
        // Get menu items
        const menuItems = await Item.find({ stall_id: stallId });
        
        // Get reviews - wrap in try-catch to not fail entire request if reviews fail
        let reviews = [];
        let avgRating = 0;
        try {
            reviews = await Feedback.find({ stall_id: stallId })
                .populate('customer_id', 'first_name last_name')
                .sort({ createdAt: -1 });
            
            // Calculate average rating
            avgRating = reviews.length > 0
                ? (reviews.reduce((sum, r) => sum + r.ratings, 0) / reviews.length).toFixed(1)
                : 0;
        } catch (reviewError) {
            console.error('Error fetching reviews:', reviewError.message);
            // Continue without reviews rather than failing the entire request
        }
        
        res.status(200).json({
            stall,
            menuItems,
            reviews,
            avgRating,
            totalReviews: reviews.length
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new stall
const createStall = async (req, res) => {
    try {
        const { stall_name, stall_location, discount, discount_items, offer } = req.body;
        const owner_id = req.user.uid; 
        // Check if owner exists
        const owner = await StallOwner.findById(owner_id);
        if (!owner) {
            return res.status(404).json({ message: 'Stall owner not found' });
        }

        // Check if owner is verified
        if (!owner.verified_status) {
            return res.status(403).json({ 
                message: 'Your account must be verified before you can create a stall. Please wait for admin approval.' 
            });
        }

        // Required fields
        const stallData = {
            owner_id,
            stall_name,
            stall_location
        };

        // Add optional fields only if they exist
        if (discount !== undefined) stallData.discount = discount;
        if (discount_items) stallData.discount_items = discount_items;
        if (offer) stallData.offer = offer;
        if (req.file) stallData.stall_image = `/stall-images/${req.file.filename}`;

        const newStall = new Stall(stallData);
        const savedStall = await newStall.save();

        res.status(201).json(savedStall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a stall
const deleteStall = async (req, res) => {
    try {
        const { stallId } = req.params;
        const owner_id = req.user.uid;

        // Find the stall
        const stall = await Stall.findById(stallId);
        if (!stall) {
            return res.status(404).json({ message: 'Stall not found' });
        }

        const isAdmin = req.user.role === 'admin';

        // Verify the user owns this stall or is admin
        if (!isAdmin && stall.owner_id.toString() !== owner_id) {
            return res.status(403).json({ message: 'Not authorized to delete this stall' });
        }

        await Stall.findByIdAndDelete(stallId);

        res.status(200).json({ message: 'Stall deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a stall
const updateStall = async (req, res) => {
    try {
        const { stallId } = req.params;
        const owner_id = req.user.uid;
        const updates = req.body;

        // Find the stall
        const stall = await Stall.findById(stallId);
        if (!stall) {
            return res.status(404).json({ message: 'Stall not found' });
        }

        // Verify the user owns this stall
        if (stall.owner_id.toString() !== owner_id) {
            return res.status(403).json({ message: 'Not authorized to update this stall' });
        }

        // Prevent changing owner_id
        delete updates.owner_id;
        delete updates._id;

        // Handle image upload if present
        if (req.file) {
            updates.stall_image = `/stall-images/${req.file.filename}`;
        }

        const updatedStall = await Stall.findByIdAndUpdate(
            stallId,
            updates,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedStall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update stall coordinates (admin or owner)
const updateStallCoordinates = async (req, res) => {
    try {
        const { stallId } = req.params;
        const { lat, lng } = req.body;

        const coords = validateCoordinates(lat, lng);
        if (coords === undefined) {
            return res.status(400).json({ message: 'Invalid latitude or longitude' });
        }

        const stall = await Stall.findById(stallId);
        if (!stall) {
            return res.status(404).json({ message: 'Stall not found' });
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = stall.owner_id.toString() === req.user.uid;

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized to update this stall' });
        }

        // If coords null -> clear marker; otherwise set
        stall.coordinates = coords || undefined;
        await stall.save();

        return res.status(200).json({ message: 'Coordinates updated successfully', stall });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Stall analytics using reviews and bookmark counts (owner or admin)
const getStallAnalytics = async (req, res) => {
    try {
        const { stallId } = req.params;

        const stall = await Stall.findById(stallId).select('owner_id');
        if (!stall) {
            return res.status(404).json({ message: 'Stall not found' });
        }

        const isAdmin = req.user?.role === 'admin';
        const isOwner = req.user?.uid && stall.owner_id?.toString() === req.user.uid;
        if (!isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized to view analytics for this stall' });
        }

        // Aggregate reviews
        const feedbacks = await Feedback.find({ stall_id: stallId }).select('ratings createdAt customer_id');
        const totalReviews = feedbacks.length;
        const avgRating = totalReviews > 0
            ? (feedbacks.reduce((sum, fb) => sum + (fb.ratings || 0), 0) / totalReviews).toFixed(1)
            : 0;

        // Bookmarks count across all customers
        const totalBookmarks = await Customer.countDocuments({ bookmark: { $in: [stallId] } });

        // Build last 7-day rating trend buckets
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const buckets = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = d.toISOString().slice(0, 10);
            buckets.push({ key, label: d.toLocaleDateString(undefined, { weekday: 'short' }), ratingSum: 0, ratingCount: 0 });
        }
        const bucketMap = Object.fromEntries(buckets.map(b => [b.key, b]));

        feedbacks.forEach(fb => {
            if (!fb.createdAt) return;
            const key = fb.createdAt.toISOString().slice(0, 10);
            const bucket = bucketMap[key];
            if (!bucket) return;
            const ratingVal = Number(fb.ratings || 0);
            if (Number.isFinite(ratingVal)) {
                bucket.ratingSum += ratingVal;
                bucket.ratingCount += 1;
            }
        });

        const ratingsData = buckets.map(b => ({
            date: b.label,
            rating: b.ratingCount > 0 ? (b.ratingSum / b.ratingCount).toFixed(1) : avgRating
        }));

        // Bookmarks trend not time-based; return flat series for UI simplicity
        const bookmarksData = buckets.map(b => ({ date: b.label, bookmarks: totalBookmarks }));

        return res.status(200).json({
            avgRating,
            totalReviews,
            totalBookmarks,
            ratingsData,
            bookmarksData
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch analytics: ' + error.message });
    }
};

export { createStall, deleteStall, updateStall, updateStallCoordinates, getStallAnalytics, getAllStalls, getStallDetails, getMyStalls };