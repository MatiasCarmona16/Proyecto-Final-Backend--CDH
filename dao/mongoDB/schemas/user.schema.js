import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String,
        default: "usuario",
    },
},
    {
    timestamps: true,
    strict: false,
    }
    );

const User = mongoose.model('users', UserSchema)
export default User