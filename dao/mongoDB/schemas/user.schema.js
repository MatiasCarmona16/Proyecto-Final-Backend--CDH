import { Schema, model } from "mongoose";

const userSchema = new Schema({
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

export const UserSchema = model('users', userSchema);
