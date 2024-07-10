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
            error: null,
        })
    }catch(error) {
        res.status(500).render("products", {
            products: [],
            titulo: "Productos", 
            error: "ERROR_"})
    }
})

routerProdsViews.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const prodct = await productsService.getProductsIdService(id)

        let isAdminUser = false;
        if (req.session.user && req.session.user.role === 'admin') {
            isAdminUser = true;
        }

        res.status(200).render('productIndividual', {
            isAdminUser: isAdminUser,
            product: prodct,
            userInfo: req.session.user, 
            titulo: "Product",
            error: null,
        })

    } catch (error) {
        res.status(500).render("productIndividual", {
            product: [],
            titulo: "Product", 
            error: "ERROR_"})
    }
})

export { routerProdsViews }