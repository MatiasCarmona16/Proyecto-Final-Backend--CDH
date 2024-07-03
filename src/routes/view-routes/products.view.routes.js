import { Router } from "express";
import { ProductsService } from "../../services/products.services.js";

const productsService = new ProductsService()
const routerProdsViews = Router() 

routerProdsViews.get("/", async (req, res) => {
    const { limit = 12, page = 1,sort, query } = req.query

    const prods = await productsService.getProductsService({ limit, page, sort, query })
    try {
        let isAdminUser = false;
        if (req.session.user && req.session.user.role === 'admin') {
            isAdminUser = true;
        }

        res.status(200).render("products", {
            js:"/products.js",
            isAdminUser: isAdminUser,
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