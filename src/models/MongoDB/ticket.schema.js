import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const ticketShchema = new Schema ({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: () => dayjs().toDate(),
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

