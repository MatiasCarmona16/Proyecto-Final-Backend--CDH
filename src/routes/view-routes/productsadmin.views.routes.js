import { Router } from "express";

const routerProdsAdmin = Router();

routerProdsAdmin.get('/', (req, res) => {
    try{
        let isAdminUser = false;
        if (req.session.user && req.session.user.role === 'admin') {
            isAdminUser = true;
        }

        res.status(200).render('productsadmin' ,{ isAdminUser: isAdminUser ,userInfo: req.session.user, titulo: "Products Acces Admin", error: null,})
    }catch(error){
        res.status(500).render("productsadmin", { titulo: "Productsadmin", error: error,})
    }
    
})

export { routerProdsAdmin }