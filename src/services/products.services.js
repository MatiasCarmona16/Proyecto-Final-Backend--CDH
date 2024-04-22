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

//Buscar Producto
export const findProducts = async () => {
    try {
        return await ProductSchema.find();
    } catch (error) {
        throw new Error (error);
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