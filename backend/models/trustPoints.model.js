import mongoose from 'mongoose';

const trustPointsSchema = new mongoose.Schema({
    points_earned: {
        type: Number,
        required: true
    },
    upvote_count: {
        type: Number,
        required: true
    },
    downvote_count: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

module.exports = mongoose.model('TrustPoints', trustPointsSchema);