import cartSchema from "../models/cart.schema.js";

export class CartManager {
    //Metodo para crear el carrito
    async createCart() {
        try {
            const newCart = await cartSchema.create({})
            return newCart;
        } catch ( error ) {
            return { success: false, message: `Error al crear el carrito.`, error: error }
        } 
    }

    //Metodo para buscar el carrito
    async findIdCart(cartId) {
        try {
            const cart = await cartSchema.findById(cartId).populate('products.id_prod');
            return cart;
        } catch (error) {
            return { success: false, message: `Error al encontrar el carrito.`, error: error }
        }
    }

    //Metoro para agregar producto al carrito
    async addProductInCart (cartId, productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error ('No se agragaron productos al Carrito')
            }
    
            let cart = await cartSchema.findById(cartId).populate('products.id_prod')
    
            if(!cart) {
                return { error: 'CART_NOT_FOUND' }
            }
    
            const prodExisting = cart.products.find((product) => product.id_prod._id.equals(productId))
    
            if (prodExisting) {
                prodExisting.quantity += quantity
            } else {
                cart.products.push({ id_prod: productId, quantity })
            }
    
            cart = await cart.save()
            return cart
        } catch (error) {
            return { success: false, message: `Error al agregar producto al carrito.`, error: error }
        }
    }

    //Metodo para eliminar un producto especifico dentro del carrito
    async deleteSpecificProduct (cartId, productId) {
        try {
            const cart = await cartSchema.findByIdAndUpdate(cartId, {$pull: {products: {id_prod: productId}}} , {new: true})
    
            if(!cart) {
                throw new Error ("CART_NOT_FOUND");
            }
    
            return cart
        } catch (error) {
            return { success: false, message: `Error al eliminar producto del carrito.`, error: error }
        }
    }

    //Metodo para eliminar todos los productos del carrito
    async deleteAllProductsCart (cartId) {
        try {
            let cart = await cartSchema.findById(cartId);
    
            if(!cart) {
                return { error: "CART_NOT_FOUND_"}
            }
    
            if(cart.products.length === 0) {
                return { message: "El carrito esta vacio"}
            }
    
            cart.products = []
            cart = await cart.save()
            return cart
        } catch (error) {
            return { success: false, message: `Error al vaciar el carrito`, error: error }
        }
    }

    //Metodo para actualizar la cantidad de producto del carrito
    async updateQuantityItem (cartId, productId, quantity) {
        try {
            let cart = await cartSchema.findById(cartId).populate("products.id_prod")
    
            if(!cart) {
                throw new Error("CART_NOT_FOUND_")
            }
    
            const product = cart.products.find((product) => product.id_prod._id.equals(productId))
    
            if(!product) {
                throw new Error ("Producto no encontrado");
            }
    
            product.quantity = quantity
            cart = await cart.save()
            return cart
        } catch(error) {
            return { success: false, message: `Error al actualizar la cantidad del producto`, error: error }
        }
    }
}

export default { CartManager }