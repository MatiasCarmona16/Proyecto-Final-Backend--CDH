import { ProductManager } from "../dao/mongodb/managers/products.managerDB.js";

const products = new ProductManager()

export class ProductsService {
    async addProductService(productData) {
        return await products.addProduct(productData)
    }

    async getProductsService({ limit = 12, page = 1, sort, query}){
        return await products.getProducts(limit, page, sort, query)
    }

    async getProductsIdService(productId) {
        return await products.getProductsId(productId)
    }

    async updtProductService(productId, productData) {
        return await products.updtProduct(productId, productData)
    }

    async dlteProductService(productId) {
        return await products.dlteProduct(productId)
    }

    async paginationProducts (limit, page, sort) {
        return await products.paginationProducts(limit, page, sort)
    }
}