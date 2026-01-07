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
    },
    stall_image: {
        type: String,
        required: false
    },
    coordinates: {
        lat: {
            type: Number,
            required: false
        },
        lng: {
            type: Number,
            required: false
        }
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true
    },
    report_count: {
        type: Number,
        default: 0,
        required: false
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Stall = mongoose.model('Stall', stallSchema);

export default Stall;