import mongoose from "mongoose";
import bcryptjs, { hash } from 'bcryptjs';
import jsonwebtoken, { JsonWebTokenError } from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    fullname: {
        type: String,
        requred: true,
        trim: true
    },
    avtar: {
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
    watchHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true});


userSchema.pre('save', async function(next){

    if(this.isModified('password')) return next();

    const salt = bcryptjs.getSalt(10);
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
                fullname: this.fullname
            },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}


userSchema.methods.generateRefresehToken = async function(){
    return jsonwebtoken.sign({
        id: this._id,
    },
    process.env.REFRESH_TKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('User', userSchema);