import CartSchema from "../schemas/cart.schema.js"

export class CartManagerMongo {

    async getIdCart(cartId) {
        try {
            const cart = await CartSchema.findById(cartId)
            return cart
        }catch (error) {
            throw error
        }
    }

        async newCart () {
            try {
                const cartNew = await CartSchema.create({})
                return cartNew
            }catch (error) {
                throw error
            }
        }
    
        async addProductCart(cartId, productId, quantity) {
            try {
                if (quantity <=0){
                    throw new Error("Agrega productos al carrito")
                }

                let cart = await CartSchema.findById(cartId).populate("products.id_prod")
                
                if(!cart) {
                    return { error: "CART_NOT_FOUND"}
                }

                const existingItem = cart.products.find((product) => product.id_prod._id.equals(productId))

                if (existingItem) {
                    existingItem.quantity += quantity
                } else {
                    cart.products.push({ id_prod: productId, quantity })
                }

                cart = await cart.save()
                return cart
            }catch (error){
                throw new Error (`Error en la carga del producto al carrito ${error.message}`)
            }
        }

        async deletProductSpecificCart(cartId, productId) {
            try {
            const cart = await findByIdAndUpdate(cartId, {$pull: {products: {id_prod: productId }}} ,{new: true})

            if(!cart) {
                throw new Error("CART_NOT_FOUND")
            }

            return cart
            } catch (error) {
                throw new Error("Error en la eliminacion del producto en el carrito")
            }
        }

        async deleteallProdsCart (cartId) {
            try{
                let cart = await CartSchema.findById(cartId)

                if (!cart) {
                    return { error: "CART_NOT_FOUND_"}
                }

                if(cart.products.length === 0){
                    return { message: "El carrito esta vacio"}
                }

                cart.products= []
                cart = await cart.save()
                return cart
            }catch(error){
                throw new Error("ERROR_ No se puden eliminar los productos del carrito")
            }
        }

        async updtaeItemQuantity(cartId, productId, quantity){
            try {
                let cart = await CartSchema.findById(cartId).populate("products.id_prod")

                if (!cart) {
                    throw new Error("CART_NOT_FOUND_")
                }

                const product = cart.products.find((product) => product.id_prod._id.equals(productId))

                if(!product) {
                    throw new Error("Producto no encontrado")
                }

                product.quantity = quantity
                cart = await cart.save()
                return cart
            }catch (error) {
                throw new Error("Error en la actualizacion de productos")
            }
        }
    }