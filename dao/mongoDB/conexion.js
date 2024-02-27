import mongoose from "mongoose";

const Database = () => {
    return mongoose.connect("mongodb+srv://matiascarmona2002:FR4GYOU6@eccomercecoder.un2azzy.mongodb.net/ecommerce")
        .then(() => {
            console.log("Base de Datos Conectada")
        }).catch((err) => {
            console.log(err)
        });
};

export { Database }