import User from '../models/user.model.js';
import Stall from '../models/stall.model.js';

// Get admin dashboard data
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeStalls = await Stall.countDocuments();
    const customers = await User.countDocuments({ type: 'customer' });
    const stallOwners = await User.countDocuments({ type: 'stall owner' });

    const stats = {
      totalUsers,
      activeStalls,
      customers,
      stallOwners,
      adminCount: await User.countDocuments({ type: 'admin' }),
    };

    // Recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    let filter = {};

    if (role && role !== 'all') {
      filter.type = role;
    }

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ban/suspend user
const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { suspended } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { isSuspended: suspended },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AdminController = {
  getDashboard,
  getAllUsers,
  suspendUser,
  deleteUser,
};

export default AdminController;
