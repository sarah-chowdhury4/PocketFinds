import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    stall_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stall',
        required: true
    },
    reporter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: ['inappropriate', 'spam', 'fake', 'closed', 'other']
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Prevent duplicate reports from same user for same stall
reportSchema.index({ stall_id: 1, reporter_id: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);

export default Report;
