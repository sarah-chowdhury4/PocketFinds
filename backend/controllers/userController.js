import User from '../models/user.model.js';
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
        // create a token
        const token = createToken(user);

        res.status(200).json({ email, token, role: user.type, userId: user.id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// logout user
const signupUser = async (req, res) => {
    const { email, password, first_name, last_name, phone } = req.body;
    try {
        const user = await User.signup(email, password, first_name, last_name, phone);

        // create a token
        const token = createToken(user);

        res.status(200).json({ email, token, role: user.type, userId: user.id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { loginUser, signupUser };