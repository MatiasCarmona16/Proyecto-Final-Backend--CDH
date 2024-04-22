import mongoose from "mongoose";

class MongoSingleton {
    static #instance;
    constructor () {
        mongoose.connect(process.env.MONGO_URL)
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Conexion instanciada")
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log("Base de datos conectada con exito")
        return this.#instance
    }
}

export {MongoSingleton}