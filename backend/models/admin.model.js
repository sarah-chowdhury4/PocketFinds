import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    updates: {
        type: [String],
        required: false
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

module.exports = mongoose.model('Admin', adminSchema);