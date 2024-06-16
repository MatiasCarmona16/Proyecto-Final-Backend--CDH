import { CartService } from '../services/cart.services.js';
import { UserService } from '../services/user.services.js';

import CustomError from '../services/errors/custom.error.js';
import EErrors from '../services/errors/enums.js';
import { generateErrorQuantityCartInfo } from '../services/errors/info.js';

const userService = new UserService()
const cartService = new CartService()

//Crear nuevo carrito en la BD
export async function newCart (req, res) {
    try {
        const userInfo = req.session.user
        
        if(!userInfo || !userInfo.cart) {
            return res.status(400).json({ message: 'Usuario o carrito no encontrado en la session'})
        }
        
        const cartUser = userInfo.cart;
        const cart = await userService.findCartIdbyUserService(cartUser);

        if(!cart) {
            return res.status(404).json({message: 'Carrito no encontrado'})
        }
        
        res.status(200).json(cart)
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: error.message });
    }
};

//Buscar carrito en la BD
export async function getCartId (req, res) {
        const { cid } = req.params
    try {
        const cart = await cartService.findIdCartService(cid)

        if(!cart) {
            res.status(404).json(`El carrito ${cid} no existe`)
        } else {
            res.status(200).json(cart)
        }
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: error.message });
    }
};

//Agregar producto al carrito
export async function addProductCart (req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    //CustomError 
    if(!quantity){

        const error = CustomError.createError({
            name: 'Product Quantity Error',
            cause: generateErrorQuantityCartInfo( quantity ),
            code: EErrors.INVALID_TYPES_ERROR
        })

        return res.status(404).json({error})

    }
        await cartService.addProductInCartService(cid, pid, quantity)
        res.status(200).json(`Producto ${pid} agregado con exito al carrito`)
}; 

//Borrar productos del carrito
export async function deleteProdCart (req, res) {
    const { cid } = req.params;
    try {
        const result = await cartService.deleteAllProductsCartService(cid);

        if(result){
            return res.status(200).json(result)
        }
        res.status(200).json(`Los productos del carrito ${cid} se eliminaron con exito`)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Borrar producto especifico de carrito
export async function deleteSpecificProductCart (req, res) {
    const { cid, pid } = req.params;
    try {
        await cartService.deleteSpecificProductService(cid, pid);
        res.status(200).json(`Producto ${pid} se elimino del carrito ${cid}`)
    } catch(error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar la cantidad del producto en carrito
export async function updateQuantityItemCart (req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        await cartService.updateQuantityItemService(cid, pid, quantity);
        res.status(200).json(`Se actualizo la cantidad del producto ${pid} con exito`)
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: error.message });
    }
};
