import { Router } from "express";
import { TicketService } from "../../services/ticket.services.js";

const ticketService = new TicketService()

const routerViewTicket = Router ();

routerViewTicket.get('/', async (req, res) => {
    try {
        const userInfo = req.session.user;

        if (!userInfo) {
            throw new Error('Usuario no autenticado');
        }
        
        const emailUser = userInfo.email;

        const ticket = await ticketService.findTicketByUserService(emailUser);
        if (!ticket) {
            throw new Error('No se encontró el ticket para el usuario proporcionado');
        }

        const ticketData = JSON.parse(JSON.stringify(ticket));
        res.status(200).render('ticket', { userInfo:req.session.user , titulo: "Ticket", ticket: ticketData, error: null });
    } catch (error) {
        res.status(500).render("ticket", { titulo: "Ticket", ticket: null, error: error.message });
    }
});

export { routerViewTicket };