import { Router } from "express";
import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";

const routerSession = Router()
const userManagerMongo = new UserManagerMongo()

routerSession.get("/current", async(req, res) => {
    const idCurr = req.session.user._id
    try {
        const user = await userManagerMongo.getUserId(idCurr)
        const { password, ...userWithoutAut} = user.toObject()

        res.status(200).json(userWithoutAut)
    }catch(error) {
        console.error("Error en el fetching", error)
        res.status(500).json({error: "Falla en el server"})
    }
})

export {routerSession}