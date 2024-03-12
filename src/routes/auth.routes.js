import { Router } from "express"; 
import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";

import { createHash, isValidatePassword } from '../utils/bcryps.js'

const userManagerMongo= new UserManagerMongo()

const routerAuth = Router ()

routerAuth.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        if (!first_name || !last_name || !email || !age) return res.status(400).json({ error: 'Todos los campos son obligatorios'})
        const userd = await userManagerMongo.newUser({
        first_name,
        last_name,
        age,
        email,
        password: createHash(password)
    });
    res.redirect('/view/login-view')
    } catch (error) {
    res.status(500).json(error);
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

routerAuth.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Error en el Logout')
    })
    res.redirect('/view/login-view')
})

routerAuth.get('/user', async (req, res) => {
    const users = await userManagerMongo.getAllUsers()
    res.status(200).send(users)
})

export { routerAuth }