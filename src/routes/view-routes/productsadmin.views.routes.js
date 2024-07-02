import { Router } from "express";
import { UserService } from "../../services/user.services.js";

const userService = new UserService()

const routerProdsAdmin = Router();

routerProdsAdmin.get('/', async (req, res) => {
    try{
        const users = await userService.getUsersService()
        
        let isAdminUser = false;
        if (req.session.user && req.session.user.role === 'admin') {
            isAdminUser = true;
        }

        res.status(200).render('productsadmin' ,{ users: users ,isAdminUser: isAdminUser ,userInfo: req.session.user, titulo: "Products Acces Admin", error: null,})
    }catch(error){
        res.status(500).render("productsadmin", { titulo: "Productsadmin", error: error,})
    }
    
})

export { routerProdsAdmin }