import { Schema, model } from "mongoose";

const ticketShchema = new Schema ({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }, //Correo del susuario
});

export const TicketSchema = model('ticket', ticketShchema);

