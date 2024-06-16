import { TicketManager } from "../dao/mongodb/managers/ticket.managerDB.js";

const ticket = new TicketManager()

export class TicketService {
    async createTicketService({ code, amount, purchaser }){
        return await ticket.createTicket({ code, amount, purchaser })
    }

    async findTicketByUserService(email) {
        return await ticket.findTicketByUser(email)
    }
}