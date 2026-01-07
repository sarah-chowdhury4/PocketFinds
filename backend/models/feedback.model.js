import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stall_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stall',
        required: true
    },
    review: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    upvote_count: {
        type: Number,
        default: 0
    },
    downvote_count: {
        type: Number,
        default: 0
    },
    // Track who has voted to prevent duplicate votes
    upvoted_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvoted_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Track reports
    reported_by: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        reported_at: {
            type: Date,
            default: Date.now
        }
    }],
    report_count: {
        type: Number,
        default: 0
    },
    flags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;