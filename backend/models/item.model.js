import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    // item_id: {
    //     type: String,
    //     required: true
    // },
    item_name: {
        type: String,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_count : {
        type: Number,
        required: true
    },
    item_category: {
        type: String,
        required: true
    },
    stall_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Item = mongoose.model('Item', itemSchema);

export default Item;