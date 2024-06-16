import { TicketSchema } from "../models/ticket.schema.js";

export class TicketManager {
    //Metodo para crear un ticket
    async createTicket ({ code, amount, purchaser }) {
        try {
            const newTicket = await TicketSchema.create({ code, amount, purchaser })
            return newTicket;
        } catch (error) {
            return { success: false, message: `Error al crear el Ticket.`, error: error }
        } 
    }

    //Metodo para buscar el ususario perteneciente del ticket
    async findTicketByUser (email) {
        try {
            const ticket = await TicketSchema.findOne({ purchaser: email }).sort({ purchase_datetime: -1 });
            return ticket;
        } catch (error) {
            return { success: false, message: `No se encontro el email perteneciente del ticket.`, error: error }
        }
    }
}

export default { TicketManager }