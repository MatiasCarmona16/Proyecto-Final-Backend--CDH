import { Router } from "express"; 
import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";

const userManagerMongo= new UserManagerMongo()

const routerAuth = Router ()

let users = []

routerAuth.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const userd = await userManagerMongo.newUser({
        first_name,
        last_name,
        age,
        email,
        password,
    });
    res.json(userd)
    } catch (error) {
    res.status(500).json(error);
    }
})

//     let userNew = req.body
//     userNew.id = Math.random()
//     users.push(userNew)
//     res.redirect('/view/login-view')
// })

routerAuth.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await userManagerMongo.getUser(email,password)
        if(user) {
            req.session.user = user
            res.status(200).redirect('/auth/profile-view')
        }else {
            res.status(401).json({ error: "Faltan Credenciales "})
        }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    
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