import { Router } from "express"; 
import { 
    getUserEmail,
    authPassport,
    recoverPassword, 
    restorePassword,
    logoutUser,
    changeUserRole,
    uploadDocuments,
    getUsers,
    deleteUsersInactive,
    getUserSpecificbyId,
    deleteUser,
    changeUserRoleforAdmin

} from "../controllers/user.manager.js";

import errorHandler from '../middlewares/error.js';
import passport from "passport";
import { uploader } from "../middlewares/multerConfig.js";

const routerAuth = Router ()

routerAuth.post("/register", authPassport);
routerAuth.post('/login', getUserEmail);
routerAuth.get('/logout', logoutUser);
routerAuth.post('/recover-password', recoverPassword);
routerAuth.post('/restore-password', restorePassword);

routerAuth.post('/users/:uid/documents', uploader.fields([
    { name: 'profiles', maxCount: 1 },
    { name: 'products', maxCount: 1 },
    { name: 'documents', maxCount: 10 }
]), uploadDocuments); 
routerAuth.post('/users/premium/:uid', changeUserRole);
routerAuth.post('/users/admin/:uid', changeUserRoleforAdmin);


routerAuth.delete('/users/:uid', deleteUser);
routerAuth.get('/users', getUsers);
routerAuth.get('/users/:uid', getUserSpecificbyId);
routerAuth.delete('/users-inactivity', deleteUsersInactive);

routerAuth.get('/github', passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {});
routerAuth.get('/callbackGithub', passport.authenticate("github", {}), async (req, res) => {

    req.session.user = req.user;
    return res.status(200).redirect('/');
});

routerAuth.use(errorHandler)

export { routerAuth }