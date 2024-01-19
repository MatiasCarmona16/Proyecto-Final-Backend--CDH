import {promises as fs} from 'fs'
import crypto from 'crypto'
import e, { json } from 'express'

export class ProductManager {
    constructor (path) {
        this.productos = []
        this.path = path
    }

    async getProducts() {
        const prdcs = JSON(await fs.readFile(this.path, 'utf-8'))
        return prdcs
    }

    async getProductsById (id) {
        const prdcs = JSON(await fs.readFile(this.path, 'utf-8'))
        const prd = prdcs.find(producto => producto.id === id)
        return prd
    }

    async addProduct(prod) {
        const prods = JSON(await fs.readFile(this.path, 'utf-8'))
        const prodExst = prods.find(producto=> producto.code === prod.code)
        if(prodExst) {
            return false
        }

        prod.id = crypto.randomBytes(16).toString('hex')
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true
    
    }

    async updateProduct (id, producto) {
        const prods = JSON(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)
        if(prod) {
        prod.title = producto.title
        prod.description = producto.description
        prod.code = producto.code
        prod.price = producto.price
        prod.status = producto.status
        prod.stock = producto.stock
        prod.category = producto.category
        prod.thumbnails = producto.thumbnails
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true
        }
            return false
    }

}