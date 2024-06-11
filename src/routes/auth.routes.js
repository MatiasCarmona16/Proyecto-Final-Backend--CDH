import { Router } from "express"; 
import { 
    getUserEmail,
    authPassport,
    recoverPassword, 
    restorePassword,
    logoutUser } from "../controllers/user.manager.js";

import errorHandler from '../middlewares/error.js';

import passport from "passport";

const routerAuth = Router ()

routerAuth.post("/register", authPassport);
routerAuth.post('/login', getUserEmail);
routerAuth.get('/logout', logoutUser);
routerAuth.post('/recover-password', recoverPassword);
routerAuth.post('/restore-password', restorePassword);

routerAuth.get('/github', passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {});
routerAuth.get('/callbackGithub', passport.authenticate("github", {}), async (req, res) => {

    req.session.user = req.user;
    return res.status(200).redirect('/');
});

routerAuth.use(errorHandler)

export { routerAuth }