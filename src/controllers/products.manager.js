import CustomError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import { generateErrorProductsInfo } from "../services/errors/info.js";

import {
    createProducts,
    findProducts,
    findProductsId,
    updateProduct,
    deleteProducts,
    paginateProducts,
} from "../services/products.services.js"; 

//Crear un nuevo producto en la BD con "createProducts"
export async function addProduct (req, res) {
    const dataProd = req.body;

        //CustomError
        if (!dataProd.title || !dataProd.description || !dataProd.price || !dataProd.category || !dataProd.stock || !dataProd.code ) {

            const error = CustomError.createError({
                name: 'Product creation Error',
                cause: generateErrorProductsInfo( dataProd ),
                code: EErrors.INVALID_TYPES_ERROR
            })
            
            console.log(error);
            return res.status(400).json({error})
        }

        const newProd = await createProducts(dataProd);
        res.status(201).json(newProd);
}

//Buscar todos los productos con "findProducts"
export async function getProducts (req, res) {
    try {
        const products = await findProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Buscar productos especificos atraves de ID con "findProductsId"
export async function getProductsId (req, res) {
    const {id} = req.params;
    try {
        const product = await findProductsId(id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Buscar y actualizar producto con "updateProduct"
export async function updtProduct (req, res) {
    const {id} = req.params;
    const productDat = req.body;
    try {
        const productUpdated = await updateProduct(id, productDat);
        res.json(productUpdated);
    } catch (error) {
        res.status(500).json({ message: error. message });
    }
}

//Buscar y eliminar producto con "deleteProducts"
export async function dlteProduct (req, res) {
    const {id} = req.params;
    try {
        await deleteProducts(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Paginar productos de la BD con "paginateProducts"
export async function paginationProducts (req, res) {
    const { limit, page, sort } = req.query;
    try {
        const pagesProds = await paginateProducts( limit, page, sort );
        res.json(pagesProds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}