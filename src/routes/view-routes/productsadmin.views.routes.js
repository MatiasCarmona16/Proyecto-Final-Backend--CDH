import { Router } from "express";

const routerProdsAdmin = Router();

routerProdsAdmin.get('/', (req, res) => {
    res.status(200).render('productsadmin')
})

export { routerProdsAdmin }