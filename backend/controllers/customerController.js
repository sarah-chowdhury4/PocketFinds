import User from '../models/user.model.js';
import Stall from '../models/stall.model.js';

// Get customer dashboard data
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.uid;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user's favorite stalls (if stored)
    const favoritesCount = user.favorites ? user.favorites.length : 0;

    // Get recent stalls viewed
    const recentStalls = await Stall.find()
      .limit(5)
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          favoritesCount,
          ordersCount: 0, // To be implemented with Orders model
          trustPoints: user.trustPoints || 0,
        },
        recentStalls,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Toggle favorite stall
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { stallId } = req.body;

    const user = await User.findById(userId);
    if (!user.favorites) {
      user.favorites = [];
    }

    const index = user.favorites.indexOf(stallId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(stallId);
    }

    await user.save();
    res.status(200).json({ success: true, data: user.favorites });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get list of favorite stalls for current customer
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.uid;
    const user = await User.findById(userId).select('favorites');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const stalls = await Stall.find({ _id: { $in: user.favorites || [] } }).lean();
    res.status(200).json({ success: true, data: stalls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const CustomerController = {
  getDashboard,
  toggleFavorite,
  getFavorites,
};

export default CustomerController;
