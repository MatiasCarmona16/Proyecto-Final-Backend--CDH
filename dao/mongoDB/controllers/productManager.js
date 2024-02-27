import ProductSchema  from "../schemas/product.schema.js"

export class ProductManagerMongo {
    constructor () {
    }

    async getProducts() {
        try {
            const prdcs = await ProductSchema.find().lean()
        return prdcs
        }catch (error) {
            return (error)
        }
    }

    async getProductsById (id) {
        try {
            const prdcs = await ProductSchema.findById(id).lean()
        if(!prdcs){
            throw { msg: "Producto no encontrado"}
        }
        return prdcs
        }catch (error) {
            throw { error }
        }
    }

    async addProduct({title, description, thumbnail, price, category, stock, code}) {
        try{
            const prod = await ProductSchema.create({
                title,
                description, 
                thumbnail, 
                price, 
                category, 
                stock, 
                code,
            }) 
            return { prod }
        }catch (error){
            return(error)
        }
    }

    async updateProduct (id, producto) {
        try {
            const prod = await ProductSchema.findByIdAndUpdate({_id: id})
            if (prod) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return false;
        }
    }

    async deleteProduct(id) {
        try {
            await ProductSchema.deleteOne({_id:id})
            return (`El producto ${id} se elimino`)
        }catch (error){
            return ('No se encuentra el producto')
        }
    }

}

