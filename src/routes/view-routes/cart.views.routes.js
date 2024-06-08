import { Router } from "express";

const routerCartView = Router()

routerCartView.get('/', async (req, res) => {
    try{
        res.status(200).render("cart", { userInfo: req.session.user, titulo: "Carrito"})
    } catch (error) {
        console.log(error)
        res.status(500).render("cart")
    }
})

export {routerCartView}