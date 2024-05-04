import { ProductSchema } from "../models/index.js";

//Crear Producto
export const createProducts = async (productData) => {
    try {
        const product = new ProductSchema(productData);
        return await product.save();
    } catch (error) {
        throw new Error (error);
    }
};

//Buscar Productos
export const findProducts = async ({ limit = 10, page = 1, sort, query}) => {
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

    } catch (error) {
        throw {
                statusCode: 500,
                message: "ERROR_ NO EXISTEN PRODUCTOS",
                error,
        }
    }
};

//Buscar Producto por ID
export const findProductsId = async (productId) => {
    try {
        return await ProductSchema.findById(productId);
    } catch (error) {
        throw new Error (error);
    }
};

//Buscar Producto y Actualizar Data
export const updateProduct = async (productId, productData) => {
    try {
        return await ProductSchema.findByIdAndUpdate(productId, productData, {new: true});
    } catch (error) {
        throw new Error (error);
    }
};

//Buscar Producto por ID y Eliminarlo
export const deleteProducts = async (productId) => {
    try {
        return await ProductSchema.findByIdAndDelete(productId);
    } catch (error) {
        throw new Error (error);
    }
};

//Paginar Productos
export const paginateProducts = async ({ limit=10, page = 1, sort}) => {
    try {
        const page = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? {price: sort === "asc" ? 1 : -1} : {},
        };

        return await ProductSchema.paginate({}, page);
    }catch (error) {
        throw new Error (error);
    }
};