import { Router } from "express";

const routerHome = Router ()

routerHome.get('/', (req, res) => {
    res.render('home', {})
})

export { routerHome }