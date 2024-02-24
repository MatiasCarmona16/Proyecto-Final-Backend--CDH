import { Router } from "express";
import { ProductManager } from "../../dao/fileSystem/models/productManager.js";

const productManager = new ProductManager("dao/fileSystem/db/productos.json")

const routerProd = Router ()

routerProd.get('/', async(req,res) => {
    const {limit} = req.query
    const prods = await productManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

//-----OBTENER PRODUCTO BY ID-----

routerProd.get('/:id', async (req, res) => {
    const {id} = req.params
    const prod = await productManager.getProductsById(id)

    if(prod) {
        res.status(200).send(prod)
    }else {
        res.status(404).send('Producto fuera de lista')
    }
})

//-----AGREGO UN NUEVO PRODUCTO MEDIANTE POST-----

routerProd.post('/', async(req, res) => {
    const confi = await productManager.addProduct(req.body)
    if(confi) {
        res.status(201).send('El producto se agrego')
    }else {
        res.status(400).send('El producto se encuentra existente')
    }
})

//----------ENVIO EL ID + REQ.BODY---------

routerProd.put('/:id', async (req, res) => {
    const {id} = req.params
    const confi = await productManager.updateProduct(id, req.body)

    if(confi) {
        res.status(200).send('El producto se actualizo con exito')
    }else {
        res.status(404).send('Producto inexistente')
    }
})

//-----ENVIO ID PARA ELIMINAR PRODUCTO-----

routerProd.delete('/:id' , async(req, res) => {
    const {id} = req.params
    const confi = await productManager.deleteProduct(id)

    if(confi) {
        res.status(200).send('El producto se elimino con exito')
    }else {
        res.status(404).send('Producto inexistente')
    }
})

export { routerProd }