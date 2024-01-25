import {promises as fs} from 'fs'
import crypto from 'crypto'

export class ProductManager {
    constructor (path) {
        this.productos = []
        this.path = path
    }

    async getProducts() {
        const prdcs = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return prdcs
    }

    async getProductsById (id) {
        const prdcs = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prd = prdcs.find(producto => producto.id === id)
        return prd
    }

    async addProduct(prod) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prodExst = prods.find(producto=> producto.code === prod.code)
        if(prodExst) {
            return false
        } else {
            prod.id = crypto.randomBytes(16).toString('hex')
            prods.push(prod)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return true
        }
    }

    async updateProduct (id, producto) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)
        if(prod) {
        prod.title = producto.title
        prod.description = producto.description
        prod.code = producto.code
        prod.price = producto.price
        prod.status = producto.status
        prod.stock = producto.stock
        prod.category = producto.category
        prod.thumbnail = producto.thumbnail
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true
        }else {
            return false
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)

        if(prod) {            
            await fs.writeFile(this.path, JSON.stringify(prods.filter(producto => producto.id !== id)))
            return true
        } else {
            return false
        }

    }

}