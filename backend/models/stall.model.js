import mongoose from 'mongoose';

const stallSchema = new mongoose.Schema({
    // stall_id: {
    //     type: Number,
    //     required: true
    // },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stall_name: {
        type: String,
        required: true
    },
    stall_location: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    discount_items: {
        type: String,
        required: false
    },
    offer: {
        type: String,
        required: false
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Stall = mongoose.model('Stall', stallSchema);

export default Stall;