import { findIdCart } from "./cart.services.js";

export const generateTicket = async (cid, email) => {
    try{
        const productsCart = await findIdCart(cid)


    } catch (error) {

    }
}

// export const generateTicket = async (cid, email) => {
//     try{
//         const productsCart = await findIdCart(cid);

//         const totalStock = calculateStock(productsCart, cid); 

//         if (totalStock.siStock.length > 0) {
//             const ticketInfo = await ticketMdl(totalStock, email)
//             await newTicket(ticketInfo)
//             const resp = {ticketInfo, totalStock}

//             return resp
//         } else {
//             console.log('Error en finalizar compra por falta de stock o tiene que agregar productos al carrito')
//         }
//     } catch (error) {
//         throw new Error (error)
//     }
// };