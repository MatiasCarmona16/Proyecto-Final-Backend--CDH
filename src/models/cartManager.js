import {promises as fs} from 'fs'
import { __dirname } from '../path.js'
import { join } from 'path';

const pathcarrt = join(__dirname, 'carrito.json')
const pathProd = join(__dirname, 'products.json')

const cartFile = await fs.readFile(pathcarrt, "utf-8")

export class CartManager {

// Convocar carrito
    async getCart () {
        try {
            return JSON.parse(cartFile)
        }catch (error) {
            console.log ('Error en el carrito', error)
            
            return []
        }
    }

    idRandom(carts) {
        const idInUse = carts.map ((cart) => cart.id)
        let newId = 1
        while (idInUse.includes(newId)){
            newId++
        }

        return newId
    }

    async getIdCart(cartId) {
        const carts = await this.getCart()
        return carts.find((cart) => cart.id === cartId)
    }

    async addCart() {
        const cart = await this.getCart()
        const newIdCart = this.idRandom(cart)
        const newCart = {
            id: newIdCart,
            products: [],
        };
        cart.push(newCart)
        await fs.writeFile(pathcarrt, JSON.stringify(cart))

        return newCart
    }

    async addProductCart(cartId, productId, quantity) {
        try {
            const products = await this.getProducts()
            const carts = await this.getCart()

            const product = products.find((prd) => parseInt(prd.id) === parseInt(productId))

            const cartBodyIndx =  carts.findIndex((cart) => parseInt(cart.id) === parseInt(cartId))

            if (cartBodyIndx === -1 || !product) {
                console.log('El carrito o producto no se encontro')

                return false
            }

            const existingItem = cart[cartBodyIndx].products.find ((prod) => parseInt(prod.id) === parseInt(productId))

            if (existingItem) {
                console.log('Producto en lista')
                existingItem.quantity += parseInt (quantity)
            }else {
                console.log('Agrega el producto al carrito')
                carts[cartBodyIndx].products.push({
                    id: parseInt(productId),
                    quantity: parseInt(quantity),
                })
            }
            
            await fs.writeFile(pathcarrt, JSON.stringify(carts, null, 2))

            return true
        } catch (error) {
            console.error('Error en la carga del producto', error)

            return false
        }
    }

    async getProducts() {
        try {
        const prodCont = await fs.readFile(pathProd, "utf-8")
        return JSON.parse(prodCont)
        } catch (error) {
        console.error("No se pudo realizar la lectura", error)

        return []
        }
    }
}