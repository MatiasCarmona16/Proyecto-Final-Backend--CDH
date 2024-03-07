import mongoose from "mongoose";
import Product from "./schemas/product.schema.js";

const Database = () => {
    return mongoose.connect("mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce")
        .then(async () => {
            console.log("Base de Datos Conectada")


            let res = await Product.paginate({}, {limit: 2})
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
};

export { Database }