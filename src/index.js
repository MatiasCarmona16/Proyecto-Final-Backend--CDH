import express from 'express'
import routerProd from './routes/products.routes'

const app = express()
let PORT = 8080

// CREACION API 
app.use('/api/products', routerProd)

app.listen (PORT, () => {
    console.log(`Server ${PORT} ON`)
})
