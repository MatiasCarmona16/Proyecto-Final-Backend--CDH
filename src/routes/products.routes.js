import { Router } from "express";
import { ProductManagerMongo } from "../../dao/mongoDB/controllers/productManager.js";

const productManagerMongo = new ProductManagerMongo()

const routerProd = Router ()

routerProd.get('/', async(req,res) => {
    const {limit} = req.query
    const prods = await productManagerMongo.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

//-----OBTENER PRODUCTO BY ID-----

routerProd.get('/:id', async (req, res) => {
    const {id} = req.params
    const prod = await productManagerMongo.getProductsById(id)

    if(prod) {
        res.status(200).send(prod)
    }else {
        res.status(404).send('Producto fuera de lista')
    }
})

//-----AGREGO UN NUEVO PRODUCTO MEDIANTE POST-----

routerProd.post('/create', async(req, res) => {
    try {
        const { title, description, thumbnail, price, category, stock, code } = req.body;
        const prod = await productManagerMongo.addProduct({
            title,
            description,
            thumbnail,
            price,
            category,
            stock,
            code
        });
        res.json(prod)
    } catch (error) {
    return error
    }
})

//----------ENVIO EL ID + REQ.BODY---------

routerProd.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const confi = await productManagerMongo.updateProduct(id, req.body)

    if(confi) {
        res.status(200).send('El producto se actualizo con exito')
    }else {
        res.status(404).send('Producto inexistente')
    }
    }catch (error) {
        (error)
    }
})

//-----ENVIO ID PARA ELIMINAR PRODUCTO-----

routerProd.delete('/:id' , async(req, res) => {
    const {id} = req.params
    const confi = await productManagerMongo.deleteProduct(id)

    if(confi) {
        res.status(200).send('El producto se elimino con exito')
    }else {
        res.status(404).send('Producto inexistente')
    }
})

export { routerProd }