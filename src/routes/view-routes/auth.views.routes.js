import { Router } from "express";
import errorHandler from "../../middlewares/error.js";
import { UserService } from "../../services/user.services.js";

const userService = new UserService()

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

routerView.get('/change-rol-user', async (req, res) => {
    const userId = req.session.user._id;

    try {
        const user = await userService.findUserIdService(userId);
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).render('changeroluser', { userInfo: user });
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ message: "Error al buscar usuario" });
    }
});

routerView.use(errorHandler)

export { routerView }