import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {v4 as uuidv4} from 'uuid';

const productSchema = new Schema({
    title: {
        type: String,
        unique: true, 
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
        enum: ['Celulares'],
        index: true
    },
    stock: {
        type: Number,
        default: 10
    },
    code: {
        type: String,
        unique: true,
        default: uuidv4,
    },
    owner: {
        type: String,
        default: "admin",
    },
})

productSchema.plugin(mongoosePaginate);

export const ProductSchema = model('products', productSchema)

