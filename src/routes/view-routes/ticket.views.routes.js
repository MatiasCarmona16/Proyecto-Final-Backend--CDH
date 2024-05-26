import { Router } from "express";

const routerViewTicket = Router ();

routerViewTicket.get('/', (req, res) => {
    res.status(200).render('ticket')
})

export {routerViewTicket}