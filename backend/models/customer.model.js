import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    verified_status: {
        type: Boolean,
        required: true
    },
    trust_points: {
        type: Number,
        required: true
    },
    bookmark: {
        type: [String],
        required: false
    },
    noti_on: {
        type: Boolean,
        required: true
    },
    badges: {
        type: [String],
        required: false
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

module.exports = mongoose.model('Customer', customerSchema);