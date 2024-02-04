import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const cartManager = new CartManager ()

const routerCart = Router ()

//-----CREACION DE CARRITO PARA PRODUCTOS -------

routerCart.post('/', async(req, res) => {
    const confi = await cartManager.addCart()

    if(confi) {
        res.status(2001).send('Carrito creado')
    }else {
        res.status(400).send('Error en los datos del carrito')
    }
})

//----------------------------------------------------
// SOLICITAR PRODUCTOS QUE PERTENEZCAN AL CARRITO CON PARAMETRO CID

routerCart.get("/:cid", async (req, res) => {
    const cid = req.params.id
    const cart = await cartManager.getIdCart(parseInt(cid))
    
    if (cart) {
        res.status(200).send(cart)
    } else {
        res
        .status(404)
        .send(`No se encontro el carrito ${cid}`)
    }
    })
    
//-------------------------------------------------------
//AGREGAR EL PRODUCTO AL ARREGLO 'PRODUCTS' DEL CARRITO

routerCart.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    
    const confi = await cartManager.addProductCart(parseInt(cid), parseInt(pid), quantity
    )
    
    if (!confi) {
        res.status(404).send("No se creo el Carrito");
    } else {
        res
        .status(200)
        .send(`Producto: ${pid} se agrego con exito al carrito: ${cid}`)
    }
})

//----------------------------------------------------------

export {routerCart}