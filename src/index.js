import express from 'express'
import { __dirname } from './path.js'
import path from 'path'
import handlebars from "express-handlebars"
import { createServer } from 'node:http'
import { Server } from 'socket.io'

//ImportRoutes
import {
    routerProd,
    routerHome,
    routerCart,
} from './routes/index.js'

//ImportClass
import { ProductManager } from './models/productManager.js'

//PortDesignada
let PORT = 8080 || process.env.PORT

const app = express()
const server = createServer (app)
const io = new Server(server)

const productManager = new ProductManager ()

//CARPETA PUBLIC
app.use("/", express.static(path.join(__dirname, "/public")))

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

// MIDDLEWARES
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// ROUTES
app.use('/api', routerHome)
app.use('/api/carts', routerCart)
app.use('/api/products', routerProd)

//APP LISTEN
server.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
})

//SOCKET SERVER
io.on('connection', (socket)=> {
    console.log('Usuario conectado')
    socket.emit('mensaje', 'Bienvenido cliente') //emit: Enviar mensaje

    socket.on('productos', (data) => {
        console.log(data)
    })
})


