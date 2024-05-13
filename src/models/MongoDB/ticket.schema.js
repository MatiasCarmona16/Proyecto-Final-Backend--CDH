import { Schema, model } from "mongoose";

const ticketShchema = new Schema ({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

export const TicketSchema = model('ticket', ticketShchema);

