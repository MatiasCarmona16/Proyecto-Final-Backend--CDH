import { Router } from "express";

const routerHome = Router ()

routerHome.get('/', async (req, res) => {
    try {
        let isAdminUser = false;
        if (req.session.user && req.session.user.role === 'admin') {
            isAdminUser = true;
        }

        res.status(200).render('home', { isAdminUser: isAdminUser ,userInfo: req.session.user, titulo: "Home", error: null,})
    } catch (error) {
        res.status(500).render("home", { titulo: "Home", error: error,})
    }
})

export { routerHome }