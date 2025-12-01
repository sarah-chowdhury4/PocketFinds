import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    updates: {
        type: [String],
        required: false
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;