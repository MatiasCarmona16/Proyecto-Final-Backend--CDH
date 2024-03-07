import { Router } from "express"; 

const routerAuth = Router ()

let users = []

routerAuth.post('/register', (req, res)=> {
    let userNew = req.body
    userNew.id = Math.random()
    users.push(userNew)

    res.redirect('/view/login-view')
})

routerAuth.post('/login', (req, res) => {
    let userNew = req.body
    let userFound = users.find(user => {
        return user.username == userNew.username && user.password == userNew.password
    })
    if(userFound){
        req.session.user = userNew.username
        req.session.password = userNew.password

        res.redirect('/view/profile-view')
        return
    }
    res.send('Incorrect user or password')
})

routerAuth.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.send('Error en el Logout')
    })
    res.redirect('/view/login-view')
})

routerAuth.get('/user', (req, res) => {
    res.send(users)
})

export { routerAuth }