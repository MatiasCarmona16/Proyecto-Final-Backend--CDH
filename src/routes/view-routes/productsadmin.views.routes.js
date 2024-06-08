import { Router } from "express";

const routerProdsAdmin = Router();

routerProdsAdmin.get('/', (req, res) => {
    res.status(200).render('productsadmin' ,{ userInfo: req.session.user, titulo: "Products Acces Admin", error: null,})
})

export { routerProdsAdmin }