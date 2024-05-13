import { Router } from "express";

import {
    newCart,
    getCartId,
    addProductCart,
    deleteProdCart,
    deleteSpecificProductCart,
    updateQuantityItemCart,
} from "../controllers/cart.manager.js"
import { newTicket } from "../controllers/ticket.manager.js";

const routerCart = Router ()

routerCart.post('/', newCart)
routerCart.get("/:cid", getCartId)
routerCart.post("/:cid/product/:pid", addProductCart)
routerCart.delete("/:cid", deleteProdCart)
routerCart.delete("/:cid/products/:pid", deleteSpecificProductCart)
routerCart.post("/:cid/products/:pid", updateQuantityItemCart)
routerCart.get("/:cid/purchase", newTicket)

export { routerCart }