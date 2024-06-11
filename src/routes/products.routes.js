import { Router } from "express";

import {
    addProduct,
    getProducts,
    getProductsId,
    updtProduct,
    dlteProduct,
} from "../controllers/products.manager.js";

import { checkProductOwnerShip } from "../middlewares/checkproductowner.js";
import errorHandler from '../middlewares/error.js'

const routerProds = Router ();

routerProds.post("/", addProduct);
routerProds.get("/", getProducts);
routerProds.get("/:id", getProductsId);
routerProds.put("/:id",checkProductOwnerShip, updtProduct);
routerProds.delete("/:id",checkProductOwnerShip, dlteProduct);

routerProds.use(errorHandler)

export {routerProds};
