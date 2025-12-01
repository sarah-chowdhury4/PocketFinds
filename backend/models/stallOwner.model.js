import mongoose from 'mongoose';

const stallOwnerSchema = new mongoose.Schema({
    verified_status: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true // shows created_at, updated_at time
});

const StallOwner = mongoose.model('StallOwner', stallOwnerSchema);

export default StallOwner;