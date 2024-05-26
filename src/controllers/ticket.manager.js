import { findIdCart } from "../services/cart.services.js";
import { createTicket } from "../services/ticket.services.js";
import {v4 as uuidv4} from 'uuid';

//Crear un ticket

export async function newTicket (req, res) {
    const { cid } = req.params;
    

    try{
        const cart = await findIdCart(cid);
        const userInfo = req.session.user
        const emailUser = userInfo.email

        console.log(emailUser)

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





// export async function newTicket (req, res) {
//     try{
//         const {cid} = req.params;

//         const cart = await findIdCart(cid)
//         const user = req.session.user;

//         console.log(cart)


//         let totalAmount = 0;
//         let purchasedProducts = [];
//         let failedProducts = [];

//         for(let item of cart.products) {
//             if (item.id_prod.stock >= item.quantity) {
//                 item.id_prod.stock -= item.quantity;
//                 await item.id_prod.save();
//                 totalAmount += item.id_prod.price * item.quantity;
//                 purchasedProducts.push(item);
//             }else {
//                 failedProducts.push(item.id_prod._id);
//             }
//         }

//         const ticketSchema = new TicketSchema({
//             amount: totalAmount,
//             purchaser: user.email
//         })
//         await ticketSchema.save()

//         cart.products = cart.products.filter(item => failedProducts.includes(item.id_prod._id))
//         await cart.save();

//         res.json({ticket, failedProducts})
        
//     } catch(error){
//         res.status(500).json({ message: error.message })
//     }
// }