import { Router } from "express";

const routerRealTimeProdView = Router ()

routerRealTimeProdView.get('/', (req, res) => {
    res.status(200).render('realTimeProducts', {titulo: "Lista de productos", error: null,})
})

export { routerRealTimeProdView }