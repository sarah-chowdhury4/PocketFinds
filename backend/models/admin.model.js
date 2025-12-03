import mongoose from 'mongoose';
import User from './user.model.js';

const adminSchema = new mongoose.Schema({
    updates: {
        type: [String],
        required: false,
        default: []
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Admin = User.discriminator('admin', adminSchema);

export default Admin;