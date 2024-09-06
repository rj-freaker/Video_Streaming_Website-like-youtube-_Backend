import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: [8, 'Minimum length is 8'],
        required: [true, 'Password is required']
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        }
    ],
    refreshToken: {
        type: String
    }
}, {timestamps: true});


userSchema.pre('save', async function(next){

    if(this.isModified('password')) return next();

    const salt = bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashPassword;
    next();
});

userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcryptjs.compare(password, this.password);
    return isMatch;
}

userSchema.methods.generateAccessToken = function(){
    return jsonwebtoken.sign(
            {
                id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}


userSchema.methods.generateRefreshToken = async function(){
    return jsonwebtoken.sign({
        id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('User', userSchema);