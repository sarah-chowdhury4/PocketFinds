import mongoose from 'mongoose';
import User from './user.model.js';

const customerSchema = new mongoose.Schema({
    verified_status: {
        type: Boolean,
        required: true,
        default: false
    },
    trust_points: {
        type: Number,
        required: true,
        default: 0
    },
    bookmark: {
        type: [String],
        required: false,
        default: []
    },
    noti_on: {
        type: Boolean,
        required: true,
        default: true
    },
    badges: {
        type: [String],
        required: false,
        default: []
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Customer = User.discriminator('customer', customerSchema);

export default Customer;
