import { Router } from "express";

const routerProdsViews = Router() 

import {
    findProducts,
} from "../../services/products.services.js"; 

routerProdsViews.get("/", async (req, res) => {
    const { limit = 10, page = 1,sort, query } = req.query

    const prods = await findProducts({ limit, page, sort, query })
    try {
        res.status(200).render("products", {
            js:"/products.js", 
            products: prods, 
            userInfo: req.session.user, 
            titulo: "Productos",
            error: null,})
    }catch(error) {
        res.status(500).render("products", {
            products: [],
            titulo: "Productos", 
            error: "ERROR_"})
    }
})

export { routerProdsViews }