import express from 'express'
import routerProd from './routes/products.routes.js'
import { __dirname } from './path.js'
import path from 'path'

const app = express()
let PORT = 8080

//middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


// CREACION API 
app.use('/api/products', routerProd)
app.use('/static', express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, '/public'))

app.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
})


