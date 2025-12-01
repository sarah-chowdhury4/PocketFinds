// importing
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './controllers/db.js';  // Added .js extension for consistency
import mongoose from 'mongoose';  // Changed from require to import
import userRoutes from './routes/user.js';  // Changed from require to import, added .js

dotenv.config();

// express app
const app = express();

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

// listen for requests
app.listen(process.env.PORT, () => {
    connectDB();
    console.log('listening on port', process.env.PORT);
});
