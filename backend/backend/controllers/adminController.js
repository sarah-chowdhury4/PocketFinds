import Admin from '../models/admin.model.js';
import User from '../models/user.model.js';
import StallOwner from '../models/stallOwner.model.js';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';
import Feedback from '../models/feedback.model.js';
import Report from '../models/report.model.js';

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.uid;
        
        // Verify admin
        const admin = await Admin.findById(userId).select('-password');
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Get total counts
        const totalUsers = await User.countDocuments();
        const totalStalls = await Stall.countDocuments();
        const totalItems = await Item.countDocuments();
        const totalReviews = await Feedback.countDocuments();

        // Get average rating across all stalls
        const allFeedback = await Feedback.find();
        const avgRating = allFeedback.length > 0
            ? (allFeedback.reduce((sum, fb) => sum + fb.ratings, 0) / allFeedback.length).toFixed(1)
            : 0;

        // Get recent stalls
        const recentStalls = await Stall.find()
            .limit(5)
            .sort({ createdAt: -1 })
            .populate('owner_id', 'first_name last_name email');

        return res.status(200).json({
            stats: {
                totalUsers: totalUsers,
                totalStalls: totalStalls,
                totalItems: totalItems,
                totalReviews: totalReviews,
                averageRating: parseFloat(avgRating)
            },
            recentStalls: recentStalls,
            recentActivity: recentStalls.map(stall => ({
                type: 'stall_created',
                message: `New stall "${stall.stall_name}" created by ${stall.owner_id?.first_name || 'User'}`,
                timestamp: stall.createdAt
            }))
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch dashboard data: ' + error.message });
    }
};

// Get pending stall owners for verification
const getPendingStallOwners = async (req, res) => {
    try {
        const pendingOwners = await StallOwner.find({ verified_status: false })
            .select('first_name last_name email phone createdAt')
            .sort({ createdAt: -1 });

        res.json({ 
            stall_owners: pendingOwners,
            total: pendingOwners.length
        });
    } catch (error) {
        console.error('Error fetching pending stall owners:', error);
        res.status(500).json({ error: 'Failed to fetch pending stall owners' });
    }
};

// Get verified stall owners
const getVerifiedStallOwners = async (req, res) => {
    try {
        const verifiedOwners = await StallOwner.find({ verified_status: true })
            .select('first_name last_name email phone createdAt')
            .populate('owned_stall', 'stall_name')
            .sort({ createdAt: -1 });

        res.json({ 
            stall_owners: verifiedOwners,
            total: verifiedOwners.length
        });
    } catch (error) {
        console.error('Error fetching verified stall owners:', error);
        res.status(500).json({ error: 'Failed to fetch verified stall owners' });
    }
};

// Verify a stall owner
const verifyStallOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        const owner = await StallOwner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ error: 'Stall owner not found' });
        }

        if (owner.verified_status) {
            return res.status(400).json({ error: 'Stall owner is already verified' });
        }

        owner.verified_status = true;
        await owner.save();

        res.json({ 
            message: 'Stall owner verified successfully',
            owner: {
                id: owner._id,
                name: `${owner.first_name} ${owner.last_name}`,
                email: owner.email,
                verified_status: owner.verified_status
            }
        });
    } catch (error) {
        console.error('Error verifying stall owner:', error);
        res.status(500).json({ error: 'Failed to verify stall owner' });
    }
};

// Revoke stall owner verification
const revokeStallOwnerVerification = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const { reason } = req.body;

        const owner = await StallOwner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ error: 'Stall owner not found' });
        }

        if (!owner.verified_status) {
            return res.status(400).json({ error: 'Stall owner is not verified' });
        }

        owner.verified_status = false;
        await owner.save();

        res.json({ 
            message: 'Stall owner verification revoked',
            owner: {
                id: owner._id,
                name: `${owner.first_name} ${owner.last_name}`,
                email: owner.email,
                verified_status: owner.verified_status
            }
        });
    } catch (error) {
        console.error('Error revoking stall owner verification:', error);
        res.status(500).json({ error: 'Failed to revoke verification' });
    }
};

// Get reported stalls
const getReportedStalls = async (req, res) => {
    try {
        // Get all reports and group by stall
        const reports = await Report.find()
            .populate('stall_id', 'stall_name stall_location stall_image owner_id')
            .populate('stall_id.owner_id', 'first_name last_name email')
            .sort({ createdAt: -1 });

        // Group reports by stall
        const stallReportMap = {};
        reports.forEach(report => {
            const stallId = report.stall_id._id.toString();
            if (!stallReportMap[stallId]) {
                stallReportMap[stallId] = {
                    _id: report.stall_id._id,
                    stall_name: report.stall_id.stall_name,
                    stall_location: report.stall_id.stall_location,
                    stall_image: report.stall_id.stall_image,
                    owner: report.stall_id.owner_id,
                    report_count: 0,
                    reports: []
                };
            }
            stallReportMap[stallId].report_count += 1;
            stallReportMap[stallId].reports.push({
                reason: report.reason,
                status: report.status,
                description: report.description,
                createdAt: report.createdAt
            });
        });

        const reportedStalls = Object.values(stallReportMap).filter(s => s.report_count > 0);

        res.json({ 
            reportedStalls: reportedStalls,
            total: reportedStalls.length
        });
    } catch (error) {
        console.error('Error fetching reported stalls:', error);
        res.status(500).json({ error: 'Failed to fetch reported stalls' });
    }
};

export default { 
    getDashboard,
    getPendingStallOwners,
    getVerifiedStallOwners,
    verifyStallOwner,
    revokeStallOwnerVerification,
    getReportedStalls
};
