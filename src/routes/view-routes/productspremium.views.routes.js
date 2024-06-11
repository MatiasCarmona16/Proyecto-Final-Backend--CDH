import { Router } from "express";

const routerProdsPremium = Router();

routerProdsPremium.get('/', (req, res) => {
    res.status(200).render('createprodpremium' ,{ userInfo: req.session.user, titulo: "Products Acces Admin", error: null,})
})

export { routerProdsPremium }