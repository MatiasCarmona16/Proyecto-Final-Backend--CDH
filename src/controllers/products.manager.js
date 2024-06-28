import {ProductsService} from "../services/products.services.js"
import { UserService } from "../services/user.services.js";

import { transporter } from "../config/mail.js";
import CustomError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import { generateErrorProductsInfo } from "../services/errors/info.js";

const productsService = new ProductsService()
const userService = new UserService()

//Crear un nuevo producto en la BD con "createProducts"
export async function addProduct (req, res) {
    const dataProd = req.body;
    const user = req.session.user;

        //CustomError
        if (!dataProd.title || !dataProd.description || !dataProd.price || !dataProd.category || !dataProd.stock) {

            const error = CustomError.createError({
                name: 'Product creation Error',
                cause: generateErrorProductsInfo( dataProd ),
                code: EErrors.INVALID_TYPES_ERROR
            })
            
            return res.status(400).json({error})
        }

        let owner = "admin";

        if (user.role === "premium") {
            owner = user.email; 
        }

        dataProd.owner = owner;

        const newProd = await productsService.addProductService(dataProd);
        res.status(201).json(newProd);
}

//Buscar todos los productos con "findProducts"
export async function getProducts (req, res) {
    try {
        const { limit = 12, page = 1, sort, query } = req.query;
        const products = await productsService.getProductsService({ limit, page, sort, query });
        return res.status(200).json(products);
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: error.message });
    }
}

//Buscar productos especificos atraves de ID con "findProductsId"
export async function getProductsId (req, res) {
    const {id} = req.params;
    try {
        const product = await productsService.getProductsIdService(id);
        if(!product) {
            return res.status(404)
        }
        res.json(product);
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        return res.status(500).json({ message: 'Product not found' });
    }
}

//Buscar y actualizar producto con "updateProduct"
export async function updtProduct (req, res) {
    const {id} = req.params;
    const productDat = req.body;
    try {
        const productUpdated = await productsService.updtProductService(id, productDat);
        res.status(201).json(productUpdated);
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json({ message: error. message });
    }
}

//Buscar y eliminar producto con "deleteProducts"
export async function dlteProduct (req, res) {
    const {id} = req.params;
    try {
        const product = await productsService.getProductsIdService(id);

        if(!product){
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const user = await userService.findUserEmailService( product.owner )

        if (user && user.role === 'premium') {

            // Envío del correo
            let mensaje = await transporter.sendMail({
                from: 'iPhone Store <matias2002carmona@gmail.com>',
                to: `${user.email}`,
                subject: 'Your product was removed from the iStore',
                text: 'Your product was removed from our iPhone Store page.',
                html: `
                    <div>
                        <h1>Hi ${user.first_name}!</h1>
                        <p>We had problems with your product, therefore it is removed from our store for certain reasons.</p>
                    </div>
                `,
            })

            if(!!mensaje.messageId){
                console.log('Mensaje enviado', mensaje.messageId)
            }
        }

        await productsService.dlteProductService(id);
        res.status(204).end();
    } catch (error) {
        req.logger.warning(`warning log - ${error}`);
        req.logger.error(`error log - ${error}`);
        res.status(500).json({ message: error.message });
    }
}

//Paginar productos de la BD con "paginateProducts"
export async function paginationProducts (req, res) {
    const { limit, page, sort } = req.query;
    try {
        const pagesProds = await productsService.paginationProducts( limit, page, sort );
        res.json(pagesProds);
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json({ message: error.message });
    }
}


