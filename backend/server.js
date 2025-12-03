// importing
import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './controllers/db.js';  // Added .js extension for consistency
import mongoose from 'mongoose';  // Changed from require to import
import userRoutes from './routes/user.js';  // Changed from require to import, added .js
import menuRoutes from './routes/menu.js';

dotenv.config();

// express app
const app = express();

app.use(express.json());

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





