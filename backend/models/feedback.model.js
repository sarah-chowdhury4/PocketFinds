import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    feedback_id: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    ratings: {
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
    },
    flags: {
        type: [(Number, String)],
        required: true
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;