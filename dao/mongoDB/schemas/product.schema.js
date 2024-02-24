import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, //Hace que los nombres de los prods sean unicos
        require: true
    },
    description : {
        type: String,
        require: true,
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true,
        enum: ['Televisores', 'Heladeras', 'Lavaropas', 'Celulares', 'Aires']
    },
    stock: {
        type: Number,
        default: 10
    }
})

const Product = mongoose.model('Products', ProductSchema)

module.exports = Product