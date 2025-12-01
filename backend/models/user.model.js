import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true // shows created_at, updated_at time
});

const User = mongoose.model('User', userSchema);

export default User;