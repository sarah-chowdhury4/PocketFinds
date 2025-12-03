import mongoose from 'mongoose';
import User from './user.model.js';

const stallOwnerSchema = new mongoose.Schema({
    verified_status: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true // shows created_at, updated_at time
});

const StallOwner = User.discriminator('stall owner', stallOwnerSchema);

export default StallOwner;