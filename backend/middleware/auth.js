import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // optional: to attach full user doc

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid

    // payload expected shape: { uid, role, userId, iat, exp }
    req.user = { uid: payload.uid, role: payload.role, userId: payload.userId };

    // Optional: attach full user document for convenience
    const userDoc = await User.findById(payload.uid).select('-password');
    if (!userDoc) return res.status(401).json({ error: 'User not found' });
    req.userDoc = userDoc;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
  next();
};
