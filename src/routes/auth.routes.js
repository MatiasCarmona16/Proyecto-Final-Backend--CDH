import { Router } from "express"; 
import { 
    getUserEmail,
    authPassport, 
    githubPassport, 
    githubCallBackPassport, 
    logoutUser } from "../controllers/user.manager.js"

const routerAuth = Router ()

routerAuth.post("/register", authPassport);
routerAuth.post('/login', getUserEmail);
routerAuth.get('/github', githubPassport);
routerAuth.get('/callbackGithub', githubCallBackPassport);
routerAuth.get('/logout', logoutUser);

export { routerAuth }