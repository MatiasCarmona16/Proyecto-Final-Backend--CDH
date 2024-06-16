import { Router } from "express";
import errorHandler from "../../middlewares/error.js"

function auth(req, res, next) {
    req.session.user 
}

const routerView = Router()

routerView.get('/login-view', (req, res) => {
    res.status(200).render('login')
})

routerView.get('/register-view', (req, res) => {
    res.status(200).render('register')
})

routerView.get('/recover-password-view', (req, res) => {
    res.status(200).render('recover-password')
})

routerView.get('/restore-password-view', (req, res) => {
    const { token } = req.query;
    if (!token) {
        req.flash('error_msg', 'Token de restablecimiento no proporcionado.');
        return res.redirect('/auth/recover-password-view');
    }
    res.status(200).render('restorepass', { token });
});

routerView.get('/change-rol-user', (req, res) => {
    res.status(200).render('changeroluser', { userInfo: req.session.user })
})

routerView.use(errorHandler)

export { routerView }