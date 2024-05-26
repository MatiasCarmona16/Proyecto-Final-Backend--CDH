import CartSchema from "../models/MongoDB/cart.schema.js";

//Funcion buscar carrito a traves de ID
export const findIdCart = async (cartId) => {
    try{
        const cart = await CartSchema.findById(cartId).populate('products.id_prod');
        return cart;
    } catch (error) {
        throw new Error(error);
    }
};

//Funcion par crear carrito 
export const createCart = async () => {
    try {
        const newCart = await CartSchema.create({})
        return newCart;
    } catch (error) {
        throw new Error (error);
    }
};

//Funcion de agregar producto en el carrito
export const addProductInCart = async (cartId, productId, quantity) => {
    try {
        if (quantity <= 0) {
            throw new Error ('No se agragaron productos al Carrito')
        }

        let cart = await CartSchema.findById(cartId).populate('products.id_prod')

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
        throw new Error (error);
    }
};

//Funcion para eliminar un producto especifico dentro del carrito 
export const deleteSpecificProduct = async (cartId, productId) => {
    try {
        const cart = await CartSchema.findByIdAndUpdate(cartId, {$pull: {products: {id_prod: productId}}} , {new: true})

        if(!cart) {
            throw new Error ("CART_NOT_FOUND");
        }

        return cart
    } catch (error) {
        throw new Error (error);
    }
};

//Funcion para eliminar todos los productos dentro del carrito 
export const deleteAllProductsCart = async (cartId) => {
    try {
        let cart = await CartSchema.findById(cartId);

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
        throw new Error (error)
    }
};

//Funcion para modificar la cantidad de productos dentro del carrito 
export const updateQuantityItem = async (cartId, productId, quantity) => {
    try {
        let cart = await CartSchema.findById(cartId).populate("products.id_prod")

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
        throw new Error (error);
    }
}