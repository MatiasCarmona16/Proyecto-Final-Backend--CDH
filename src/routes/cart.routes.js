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

import { checkProductOwnerShipInCart } from "../middlewares/checkproductowner.js";

const routerCart = Router ()

routerCart.post('/', newCart)
routerCart.get("/:cid", getCartId)
routerCart.post("/:cid/product/:pid",checkProductOwnerShipInCart, addProductCart)
routerCart.delete("/:cid", deleteProdCart)
routerCart.delete("/:cid/products/:pid", deleteSpecificProductCart)
routerCart.put("/:cid/products/:pid", updateQuantityItemCart)
routerCart.post("/:cid/purchase", newTicket)

export { routerCart }