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
        if(user) {
            if(!isValidatePassword(user, password)) {
                res.status(401).send({ error: "Datos incorrectos" })
            }
            req.session.user = user
            res.status(200).redirect('/view/profile-view')
        }
    }catch (error) {
        res.status(500).json({ error: error.message })
    }
    // if(!email || !password) return res.status(400)({status: "error", error: "Datos incompletos"})

    // // const user = await User.findOne({email:email},{email:1,first_name:1,last_name:1,password:1})
    // const user = await userManagerMongo.getUser(email,password)
    // if(!user) return res.status(400).send({status: "error", error: "Usuario no encontrado"})

    // if(!isValidatePassword(email, password)) return res.status(403).send({status:"error", error: "Clave incorrecta"})
    
    // delete user.password;
    // req.session.user = user;
    // return res.redirect('/view/profile-view')

    
    // let userNew = req.body
    // let userFound = users.find(user => {
    //     return user.username == userNew.username && user.password == userNew.password
    // })
    // if(userFound){
    //     req.session.user = userNew.username
    //     req.session.password = userNew.password
    //     req.session.rol = 'usuario'

    //     res.redirect('/view/profile-view')
    //     return
    // }
    // res.send('Incorrect user or password')
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