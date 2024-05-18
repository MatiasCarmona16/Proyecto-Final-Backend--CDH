import { generatorProductsEccom } from "../services/mocks.js";

export async function generateProductsMocks (req, res) {
    const products = []
    try {
        for(let i = 0; i < 100; i++){
            products.push(generatorProductsEccom())
        }
        return res.status(200).json(products)
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}