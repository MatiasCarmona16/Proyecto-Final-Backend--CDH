import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, //Hace que los nombres de los prods sean unicos
        required: true
    },
    description : {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Televisores', 'Heladeras', 'Lavaropas', 'Celulares', 'Aires']
    },
    stock: {
        type: Number,
        default: 10
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
})

const Product = mongoose.model('products', ProductSchema)
export default Product
