import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { __dirname } from './path.js'
import path from 'path'
import handlebars from "express-handlebars"

import MongoStore from 'connect-mongo'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import MessageSchema from "../dao/mongoDB/schemas/chat.schema.js"

import { Database } from '../dao/mongoDB/conexion.js';

//ImportRoutes
import {
    routerProd,
    routerHome,
    routerCart,
    chatRouter,
    routerView,
    routerAuth,
} from './routes/index.js'

//PortDesignada
let PORT = 8080 || process.env.PORT

const app = express()
const server = createServer (app)
const io = new Server(server)

//CARPETA PUBLIC
app.use("/", express.static(path.join(__dirname, "/public")))

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

// MIDDLEWARES
app.use(cookieParser())
app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

//MIDDLEWARE SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce',
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

//SOCKET SERVER
let arrymensaje = []
io.on('connection', (socket)=> {
    console.log('Usuario conectado')
    socket.emit('mensaje', 'Bienvenido cliente') //emit: Enviar mensaje

    socket.on('nuevo-mensaje', (data) => {
        arrymensaje.push(data)
        io.sockets.emit('mensaje-all', arrymensaje)

        MessageSchema.create({
            user : data.username ,
            message: data.message
        })
    })
})

// ROUTES
app.use('/', routerHome)
app.use('/carts', routerCart)
app.use('/products', routerProd)
app.use('/chat', chatRouter)

//ROUTES VIEWS
app.use('/view', routerView)
app.use('/auth', routerAuth)

//APP LISTEN
server.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
    Database();
})





