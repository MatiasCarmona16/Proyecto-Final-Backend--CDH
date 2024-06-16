import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({

    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

const Message = mongoose.model('messages', MessageSchema)
export default Message