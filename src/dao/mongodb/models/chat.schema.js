import { Schema, model } from "mongoose";

const messageSchema = new Schema({

    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date, 
        default: Date.now
    }
})

export const MessageSchema = model('chat', messageSchema);