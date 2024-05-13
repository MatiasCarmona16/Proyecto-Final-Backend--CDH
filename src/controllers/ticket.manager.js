import { findIdCart } from '../services/cart.services.js'
import {
    generateTicket,
} from '../services/ticket.services.js'
import { findUserEmail, findUserId } from '../services/user.services.js'

//Crear un ticket

export async function newTicket (req, res) {
    const { cid } = req.params
    console.log("ID del carrito:", cid);
    try {
        const cart = await findIdCart(cid)
        console.log("Resultado de findIdCart:", cart)

        if(cart && cart.usuario_id) {
            const user = await findUserId(cart.usuario_id)
            console.log("Resultado de findUserId:", user)
            if(user){
                const userEmail = user.email
                res.status(200).json({cart, userEmail})
            } else {
                res.status(400).json({message: 'no se encontro el usuario'})
            }
        } else {
            res.status(400).json({message: ' no se encontro el carrito'})
        }
        
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}