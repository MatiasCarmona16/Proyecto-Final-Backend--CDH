import { findIdCart } from "../services/cart.services.js";
import { 
    createTicket,
} from "../services/ticket.services.js";
import {v4 as uuidv4} from 'uuid';

//Crear un ticket

export async function newTicket (req, res) {
    const { cid } = req.params;
    

    try{
        const cart = await findIdCart(cid);
        const userInfo = req.session.user
        const emailUser = userInfo.email
        
        let totalAmount = 0;
        let purchasedProducts = [];
        let failedProducts = [];

        for(let item of cart.products) {
            if (item.id_prod.stock >= item.quantity) {
                item.id_prod.stock -= item.quantity;
                await item.id_prod.save();
                totalAmount += item.id_prod.price * item.quantity;
                purchasedProducts.push(item);
            }else {
                failedProducts.push(item.id_prod._id);
            }
        }

        const ticketCreated = await createTicket({
            code: uuidv4(),
            amount: totalAmount,
            purchaser: emailUser,
        })

        return res.status(200).json(ticketCreated)


    } catch(error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json({ message: error.message });
    }
    
}