import { Router } from "express";
import { findUserId } from "../services/user.services.js";

const routerSession = Router();

routerSession.get("/current", async(req, res) => {
    const idCurr = req.session.user._id;
    try {
        const user = await findUserId(idCurr);
        const { password, ...userWithoutAut} = user.toObject();

        res.status(200).json(userWithoutAut);
    }catch(error) {
        res.status(500).json({error: "Falla en el servidor"});
    }
});

export {routerSession};