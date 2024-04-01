import { Router } from "express";

const routerHome = Router ()

routerHome.get('/', async (req, res) => {
    try {
        res.status(200).render('home', { userInfo: req.session.user, titulo: "Home", error: null,})
    } catch (error) {
        res.status(500).render("home", { titulo: "Home", error: error,})
    }
})

export { routerHome }