import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';

// Get stall owner dashboard
const getDashboard = async (req, res) => {
  try {
    const owner_id = req.user.uid;
    const stall = await Stall.findOne({ owner_id }).lean();

    if (!stall) {
      return res.status(404).json({ error: 'Stall not found for this owner' });
    }

    // Get stall items
    const items = await Item.find({ stall_id: stall._id }).lean();

    // Calculate stats (dummy data for now)
    const stats = {
      todayOrders: 45,
      weeklyRevenue: 24500,
      monthlyGrowth: 18.5,
      views: 12453,
      totalReviews: items.length > 0 ? Math.floor(Math.random() * 300) : 0,
      avgRating: 4.5,
      repeatCustomers: 68,
    };

    res.status(200).json({
      success: true,
      data: {
        stall,
        items,
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stall analytics
const getAnalytics = async (req, res) => {
  try {
    const owner_id = req.user.uid;
    const stall = await Stall.findOne({ owner_id }).lean();

    if (!stall) {
      return res.status(404).json({ error: 'Stall not found' });
    }

    // Dummy analytics data
    const viewsData = [
      { day: 'Mon', views: 450 },
      { day: 'Tue', views: 620 },
      { day: 'Wed', views: 580 },
      { day: 'Thu', views: 720 },
      { day: 'Fri', views: 890 },
      { day: 'Sat', views: 1200 },
      { day: 'Sun', views: 980 },
    ];

    const revenueData = [
      { week: 'Week 1', revenue: 18500 },
      { week: 'Week 2', revenue: 22000 },
      { week: 'Week 3', revenue: 19800 },
      { week: 'Week 4', revenue: 24500 },
    ];

    res.status(200).json({
      success: true,
      data: {
        viewsData,
        revenueData,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const StallOwnerController = {
  getDashboard,
  getAnalytics,
};

export default StallOwnerController;
