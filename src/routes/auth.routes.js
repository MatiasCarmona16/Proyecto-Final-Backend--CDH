import { Router } from "express"; 
import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";
import passport from "passport";

import { createHash, isValidatePassword } from '../utils/bcryps.js'

const userManagerMongo= new UserManagerMongo()

const routerAuth = Router ()

routerAuth.post("/register", passport.authenticate('register', {failureRedirect: "/view/failedregister-view",}), async (req, res) => {
    try {
        res.status(200).redirect('/view/profile-view')
    } catch(error) {
        res.status(500).json(error)
    }
})

routerAuth.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userManagerMongo.getUser(email)
        if(!user) {
            return res.status(401).send({ error: "Usuario no encontrado" })
        } 
        
        if(!isValidatePassword(user, password)) {
            return res.status(401).send({ error: "Email o contraseña incorrecta" })
        }
            req.session.user = user
            res.status(200).redirect('/view/profile-view')
    }catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

routerAuth.get('/github', passport.authenticate("github", {scope:['user:email']}), (req, res) => {})

routerAuth.get('/callbackGithub', passport.authenticate("github", {failureRedirect:'/login'}), (req, res) => {
    req.session.user = req.user;

    res.redirect('/');
})


routerAuth.get('/logout', (req, res) => {
    req.session.destroy((err) => {
    if (err) {
        console.log('Error en el Logout', err)
        res.status(500).send('Error en el Logout')
    }else {
        res.redirect('/view/login-view')
    }
})
})

routerAuth.get('/user', async (req, res) => {
    const users = await userManagerMongo.getAllUsers()
    res.status(200).send(users)
})

export { routerAuth }