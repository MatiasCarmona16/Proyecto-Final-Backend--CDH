import mongoose from "mongoose";
import configvarenv from "../../config/configvarenv.js";

export default class MongoSingleton {
    static #instance;

    constructor(){
        this.#connectMongoDB();
    };

    static getInstance(){
        if(this.#instance){
            console.log('Se establecio conexion con MongoDB');
        }else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    };

    #connectMongoDB = async ()=>{
        try{
            await mongoose.connect(configvarenv.mongoUrl);
            console.log('Se conecto con exito a la BD con Mongoose');
        }catch(error) {
            console.error('No se pudo conectar a la BD por mongoose' + error);
            process.exit();
        }
    }
}