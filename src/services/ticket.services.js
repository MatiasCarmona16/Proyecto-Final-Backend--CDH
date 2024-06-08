import { TicketSchema } from "../models/MongoDB/ticket.schema.js";

export const createTicket = async ({ code, amount, purchaser }) => {
    try {
        const newTicket = await TicketSchema.create({ code, amount, purchaser })
        return newTicket;
    } catch (error) {
        throw new Error (error);
    }
};

export const findTicketByUser = async (email) => {
    try {
        const ticket = await TicketSchema.findOne({ purchaser: email }).sort({ purchase_datetime: -1 });;
        return ticket;
    } catch (error) {
        throw new Error(error);
    }
};