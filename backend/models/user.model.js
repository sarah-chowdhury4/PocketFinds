import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import bcrypt from 'bcrypt';
import validator from 'validator';

const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    },
}, {
    timestamps: true, // shows created_at, updated_at time
    discriminatorKey: 'type'
});

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

// static sign up method
userSchema.statics.signup = async function(email, password, first_name, last_name, phone, userType = 'customer') {
    // validation
    if (!email || !password || !first_name || !last_name) {
        throw Error('All fields except phone must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    // check if email exists
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use');
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user as a discriminator (default type 'customer')
    const user = await this.create({ email, password: hash, first_name, last_name, phone: phone || '', type: userType });
    
    return user;
}

// static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

export default User;