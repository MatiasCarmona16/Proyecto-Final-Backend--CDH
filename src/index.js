import express from 'express'
import { __dirname } from './path.js'
import path from 'path'
import handlebars from "express-handlebars"
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import routerProd from './routes/products.routes.js'
import routerHome  from './routes/index.js'
import routerCart from './routes/cart.routes.js'
import { Socket } from 'dgram'

const app = express()
let PORT = 8080
const server = createServer (app)

//SOCKET
const io = new Server(server)
io.on('connection', (socket)=> {
    console.log('Usuario conectado')
    socket.emit('mensaje', 'Bienvenido cliente')
})

//CARPETAS ESTATICAS
app.use("/", express.static(path.join(__dirname, "/public")))

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//MIDDLEWARES
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// CREACION API //ROUTES
app.use('/api', routerHome)
app.use('/api/carts', routerCart)
app.use('/api/products', routerProd)

server.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
})


