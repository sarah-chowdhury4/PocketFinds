// importing
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './controllers/db.js';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import menuRoutes from './routes/menu.js';
import stallRoutes from './routes/stall.js';
import dashboardRoutes from './routes/dashboard.js';
import cors from 'cors';

dotenv.config();

// express app
const app = express();

// CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to PocketFinds API' });
});
app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/stalls', stallRoutes);
app.use('/api/dashboard', dashboardRoutes);

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
