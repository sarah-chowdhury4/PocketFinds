import mongoose from 'mongoose';

const stallOwnerSchema = new mongoose.Schema({
    verified_status: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true // shows created_at, updated_at time
});

module.exports = mongoose.model('StallOwner', stallOwnerSchema);