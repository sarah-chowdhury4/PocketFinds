import mongoose from 'mongoose';

const stallSchema = new mongoose.Schema({
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
        required: false,
        default: 0
    },
    discount_items: {
        type: String,
        required: false
    },
    offer: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: '/placeholder.svg?height=200&width=300'
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: true
});

const Stall = mongoose.model('Stall', stallSchema);

export default Stall;

