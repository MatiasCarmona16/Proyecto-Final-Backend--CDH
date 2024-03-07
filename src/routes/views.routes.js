import { Router } from "express";

const routerView = Router ()

routerView.get('/login-view', (req, res) => {
    res.render('login')
})

routerView.get('/register-view', (req, res) => {
    res.render('register')
})

routerView.get('/profile-view', (req, res) => {
    res.render('profile')
})

export { routerView }