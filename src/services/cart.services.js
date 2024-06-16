import { CartManager } from "../dao/mongodb/managers/cart.managerDB.js"

const carts = new CartManager()

export class CartService {
    async createCartService(){
        return await carts.createCart({})
    }

    async findIdCartService(cartId){
        return await carts.findIdCart(cartId)
    }

    async addProductInCartService(cartId, productId, quantity){
        return await carts.addProductInCart(cartId, productId, quantity)
    }

    async deleteSpecificProductService(cartId, productId){
        return await carts.deleteSpecificProduct(cartId, productId)
    }

    async deleteAllProductsCartService(cartId){
        return await carts.deleteAllProductsCart(cartId)
    }

    async updateQuantityItemService(cartId, productId, quantity){
        return await carts.updateQuantityItem(cartId, productId, quantity)
    }
}