import { Router } from "express";
import { ProductManagerMongo } from "../../../dao/mongoDB/controllers/productManager.js";

const routerProdsViews = Router() 
const productManagerMongo = new ProductManagerMongo()

routerProdsViews.get("/", async (req, res) => {
    const { limit = 10, page = 1,sort, query } = req.query

    const prods = await productManagerMongo.getProducts({ limit, page, sort, query })
    try {
        res.status(200).render("products", {products: prods, titulo: "Productos",error: null,})
    }catch(error) {
        console.log(error)
        res.status(500).render("products", {products: [], titulo: "Productos", error: "ERROR_"})
    }
})

export { routerProdsViews }