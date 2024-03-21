import ProductSchema  from "../schemas/product.schema.js"

export class ProductManagerMongo {

    async getProducts({ limit = 10, page = 1, sort, query}) {
        try {
            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort ? { price: sort === "asc" ? 1 : -1} : {}
            }
            let filter = {}
            if (query) {
                filter = {category: query}
            }

            const prods = await ProductSchema.paginate(filter, options)
            const payload = prods.docs.map((doc) => doc.toObject())

            const reply = {
                status: "success",
                payload: payload,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: prods.page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: prods.hasPrevPage
                ? `/products?limit=${options.limit}&page=${prods.prevPage}&sort=${sort || ""}&query=${query || ""}` :null,
                nextLink: prods.hasNextPage
                ?`/products?limit=${optiones.limit}&page=${prods.nextPage}&sort=${sort || ""}&query=${query || ""}` :null,
            }
            console.log(prods)
            return reply

        }catch (error) {
            throw {
                statusCode: 500,
                message: "ERROR_ NO EXISTEN PRODUCTOS",
                error,
        }
    }}

    async getProductsById (id) {
        try {
            const prdcs = await ProductSchema.findById(id).lean()
        if(!prdcs){
            throw { msg: "Producto no encontrado"}
        }
        return prdcs
        }catch (error) {
            throw { 
            statusCode: 500,
            message: `ERROR_ NO SE PUDO ENCONTRAR EL PRODUCTO SOLICITADO`,
            error,
            }
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
            return {
                msg: "Error al añadir producto a la base de datos",
                error: {
                    statusCode: 500,
                    message: "ERROR_ NO SE PUDO AGREGAR PRODUCTO A LA BD"
                }
            }
        }
    }

    async updateProduct (id, {title, description, thumbnail, price, category, stock, code}) {
        try {
            const prod = await ProductSchema.findByIdAndUpdate(id,{title, description, thumbnail, price, category, stock, code},{new: true})
            if (!prod) {
                return {
                    msg:`El producto ${id} no existe o no se ecuenta`,
                    error: {
                        statusCode: 404,
                        message:`ERROR_ NO SE ENCUENTRA PRODUCTO CON ID: ${id}`,
                    },
                };
            } 
            return {msg: "El Producto se actualizo con exito", prod}
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return {
                msg:`Error en la actualizacion del producto`,
                    error: {
                        statusCode: 500,
                        message:`ERROR_ NO SE REALIZO LA ACTUALIZACION`,
            },
        }
    }
    }

    async deleteProduct(id) {
        try {
            const prod = await ProductSchema.findByIdAndDelete(id)
            if(!prod) {
                return {
                    error: {
                        statusCode: 404,
                        message: `El producto ${id} no existe o no se ecuenta`,
                    }
                }
            }
            return {msg: 'Producto eliminado con exito'}
        }catch (error){
            return {
                msg: 'Error en la eliminacion del producto',
                statusCode: 500,
                message: `ERROR_ NO SE REALIZO LA ELIMINACION`,
            }
        }
    }

}

