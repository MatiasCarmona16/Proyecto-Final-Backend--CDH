import { Router } from "express";
// import { CartManagerMongo } from "../../dao/mongoDB/controllers/cartManager.js";

// const cartManagerMongo = new CartManagerMongo ()

const routerCart = Router ()

// routerCart.post('/', async(req, res) => {
//     try{
//         const cart = await cartManagerMongo.newCart()
//         res.status(200).json(cart)
//     }catch (error) {
//         console.error("ERROR_ NO SE PUDO CREAR EL CARRITO DE COMPRA")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

// //----------------------------------------------------

// routerCart.get("/:cid", async (req, res) => {
//     const { cid } = req.params.id

//     try{
//         const cart = await cartManagerMongo.getIdCart(cid)

//         if(!cart) {
//             res.status(404).json(`El carrito ${cid} no existe`)
//         } else {
//             res.status(200).json(cart)
//         }
//     }catch (error) {
//         console.error("ERROR_ EN LA BUSQUEDA DE CARRITO")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

// //-------------------------------------------------------

// routerCart.post("/:cid/product/:pid", async (req, res) => {
//     const { cid, pid } = req.params
//     const { quantity } = req.body
    
//     try {
//         await cartManagerMongo.addProductCart(cid, pid, quantity)
//         res.status(200).json(`Producto ${pid} agregado con exito al carrito`)
//     }catch (error) {
//         console.error("ERROR_ EN AGREGAR PRODUCTO")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

// //----------------------------------------------------------

// routerCart.delete("/:cid", async (req, res) => {
//     const { cid } = req.params
//     try {

//         const result = await cartManagerMongo.deleteallProdsCart(cid)

//         if(result.msg) {
//             return res.status(200).json(result.msg)
//         }
//         res.status(200).json(`Los productos del carrito ${cid} se eliminaron con exito`)
//     } catch (error) {
//         console.error("ERROR_ NO SE PUDO ELIMINAR PRODUCTOS DEL CARRITO")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

// //-----------------------------------------------------------

// routerCart.delete("/:cid/products/:pid", async (req, res) => {
//     const { cid, pid } = req.params
//     try {

//         await cartManagerMongo.deletProductSpecificCart(cid, pid)
//         res.status(200).json(`Producto ${pid} se elimino del carrito ${cid}` )
//     } catch(error) {
//         console.error("ERROR_ NO SE PUDO ELIMINAR PRODUCTO ESPECIFICO DEL CARRITO")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

// //-----------------------------------------------------------

// routerCart.post("/:cid/products/:pid", async (req, res) => {
//     const {cid, pid} = req.params
//     const {quantity} = req.body

//     try{
//         await cartManagerMongo.updtaeItemQuantity(cid, pid, quantity)
//         req.status(200).json(`Se actualizo la cantidad del producto ${pid} con exito`)

//     }catch(error){
//         console.error("ERROR_ NO SE ACTUALIZO LA CANTIDAD DEL PRODUCTO")
//         res.status(500).json("INTERNAL_ERROR")
//     }
// })

export { routerCart }