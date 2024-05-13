import { deleteSpecificProduct } from "../services/cart.services.js";
import { updateProduct } from "../services/products.services.js";
import { v4 as uuidv4 } from "uuid";

//Funcion para stock

export async function calculateStock(products, cid) {
    let accumulator = 0;
    let stockProducts = { siStock: [], noStock: [] }

    try {
        for ( const element of products) {
            const { product, quantity, total } = element;
            if (product.stock > quantity ) {
                stockProducts.siStock.push(element)
                accumulator += total;

                const newStock = product.stock - quantity;
                await updateProduct(element.id_prod, { stock: newStock});
                await deleteSpecificProduct(cid, element.id_prod);
            } else {
                stockProducts.noStock.push(element);
            }
        }
        stockProducts.accumulator = accumulator;
        return stockProducts;
    } catch (error) {
        throw new Error(`Error en el cálculo de stock: ${error.message}`);
    }
}

export function ticketMdl (totalStock, email) {
    const dateCurr = new Date()
    const ticket = {
        code: uuidv4(),
        purchase_datetime: dateCurr,
        amount: totalStock.accumulator,
        purchaser: email
    }
    return ticket
}