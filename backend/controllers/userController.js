import User from '../models/user.model.js';

// login user
const loginUser = async (req, res) => {
    res.json({ message: 'login user' });
};

// logout user
const signupUser = async (req, res) => {
    res.json({ message: 'signup user' });
};

export { loginUser, signupUser };