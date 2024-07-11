import { ProductSchema } from "../models/product.schema.js";

export class ProductManager {
    //Metodo para agregar productos
    async addProduct (productData) {
        try {
            const product = new ProductSchema(productData);
            return await product.save();
        } catch(error) {
            return { success: false, message: `Error al agregar el producto.`, error: error }
        }
    }

    //metodo para obtener todos los productos
    async getProducts (limit = 12, page = 1, sort, query) {
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
                ? `/productsview?limit=${options.limit}&page=${prods.prevPage}&sort=${sort || ""}&query=${query || ""}` :null,
                nextLink: prods.hasNextPage
                ?`/productsview?limit=${options.limit}&page=${prods.nextPage}&sort=${sort || ""}&query=${query || ""}` :null,
            }
            return reply
        }catch(error) {
            return { success: false, message: `Error en obtener los productos.`, error: error }
        }
    }

    //Metodo para obtener un producto por su ID
    async getProductsId (productId) {
        try {
            const prod = await ProductSchema.findById(productId);
            return prod;
        } catch (error) {
            return { success: false, message: `Error al obtener el ID del producto.`, error: error }
        }
    }

    //Metodo para actualizar producto
    async updtProduct (productId, productData) {
        try {
            return await ProductSchema.findByIdAndUpdate(productId, productData, {new: true});
        } catch (error) {
            return { success: false, message: `Error al actualizar producto.`, error: error };
        }
    }

    //Metodo para deliminar producto
    async dlteProduct (productId) {
        try {
            return await ProductSchema.findByIdAndDelete(productId);
        } catch (error) {
            return { success: false, message: `Error al eliminar producto.`, error: error };
        }
    }

    //Metodo para paginar 
    async paginationProducts ({ limit=12, page = 1, sort}) {
        try {
            const page = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort ? {price: sort === "asc" ? 1 : -1} : {},
            };
    
            return await ProductSchema.paginate({}, page);
        } catch(error) {
            return { success: false, message: `Error al paginar productos.`, error: error }
        }
    }
}

export default { ProductManager }