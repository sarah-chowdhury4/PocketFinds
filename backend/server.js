// importing
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './controllers/db.js';  // Added .js extension for consistency
import mongoose from 'mongoose';  // Changed from require to import

// Import all models to ensure they are registered
import './models/user.model.js';
import './models/admin.model.js';
import './models/customer.model.js';
import './models/stallOwner.model.js';
import './models/stall.model.js';
import './models/item.model.js';
import './models/feedback.model.js';
import './models/report.model.js';
import userRoutes from './routes/user.js';  // Changed from require to import, added .js
import menuRoutes from './routes/menu.js';
import stallRoutes from './routes/stall.js';
import dashboardRoutes from './routes/dashboard.js';
import reviewRoutes from './routes/review.js';

import notifRoutes from './routes/notif.js';
import bookmarkRoutes from './routes/bookmark.js';

dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app
const app = express();

// CORS middleware - allow frontend to connect
app.use(cors({
    origin: ['http://44.192.98.90:3000', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());

// Serve static files (stall images)
// Images are stored with paths like /stall-images/filename.jpg
app.use('/stall-images', express.static(path.join(__dirname, 'static', 'stall-images')));

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to PocketFinds' });
});
app.use('/api/user', userRoutes);

app.use('/api/menu', menuRoutes);

app.use('/api/notifications', notifRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/stall', stallRoutes);
app.use('/api/reviews', reviewRoutes);

// connect to db
// gist: connect to db, if no error start listening for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('DB connection sucessful!');
            console.log('listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })





