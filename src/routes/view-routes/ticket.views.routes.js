import { Router } from "express";

const routerViewTicket = Router ();

routerViewTicket.get('/', async (req, res) => {
    try {
        res.status(200).render('ticket', {  userInfo: req.session.user, titulo: "Ticket", error: null,})
    } catch (error) {
        res.status(500).render("ticket", { titulo: "Ticket", error: error,})
    }
})

export {routerViewTicket}