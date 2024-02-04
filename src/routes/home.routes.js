import { Router } from "express";

const routerHome = Router ()

routerHome.get('/home', (req, res) => {
    res.render('home', {})
})

export { routerHome }