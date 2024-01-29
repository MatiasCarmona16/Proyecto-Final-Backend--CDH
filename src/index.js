import express from 'express'
import { __dirname } from './path.js'
import path from 'path'
import handlebars from "express-handlebars"

import routerProd from './routes/products.routes.js'
import routerHome  from './routes/index.js'
import routerCart from './routes/cart.routes.js'

const app = express()
let PORT = 8080

//CARPETAS ESTATICAS
app.use(express.static(__dirname+'/public'))

//MOTOR DE PLANTILLA
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//MIDDL
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

// CREACION API //ROUTES
app.use('/api', routerHome)
app.use('/api/carts', routerCart)
app.use('/api/products', routerProd)
app.use('/static', express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, '/public'))

app.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
})


