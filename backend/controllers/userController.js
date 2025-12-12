import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Customer from '../models/customer.model.js';
import StallOwner from '../models/stallOwner.model.js';
import jwt from 'jsonwebtoken';

// TOKEN CREATE
const createToken = (user) => {
    return jwt.sign(
        { uid: user._id.toString(), role: user.type, userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // fetch role-specific document (exclude password)
        let roleData = null;
        if (user.type === 'customer') {
            roleData = await Customer.findById(user._id).select('-password');
        } else if (user.type === 'admin') {
            roleData = await Admin.findById(user._id).select('-password');
        } else if (user.type === 'stall owner') {
            roleData = await StallOwner.findById(user._id).select('-password');
        }

        // create a token
        const token = createToken(user);

        // return token, role and some role-specific data for dashboard
        res.status(200).json({
            email,
            token,
            role: user.type,
            userId: user.id,
            user: roleData || { email: user.email, first_name: user.first_name, last_name: user.last_name }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// logout user
const signupUser = async (req, res) => {
    const { email, password, first_name, last_name, phone, role, avatar } = req.body;
    try {
        // restrict role creation via public signup
        if (role && role === 'admin') {
            return res.status(403).json({ error: 'Cannot create admin via public signup' });
        }

        // allowed public roles
        const allowedRoles = ['customer', 'stall owner'];
        const userType = role && allowedRoles.includes(role) ? role : 'customer';

        const user = await User.signup(email, password, first_name, last_name, phone, userType, avatar);

        // create a token
        const token = createToken(user);

        res.status(200).json({ email, token, role: user.type, userId: user.id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get current user
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.uid;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update user profile
const updateProfile = async (req, res) => {
    const { avatar, first_name, last_name, phone } = req.body;
    const userId = req.user.uid;

    try {
        const updateData = {};
        if (avatar !== undefined) updateData.avatar = avatar;
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (phone !== undefined) updateData.phone = phone;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { loginUser, signupUser, getCurrentUser, updateProfile };
