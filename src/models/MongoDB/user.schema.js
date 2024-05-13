import { Schema, model } from "mongoose";
import { createCart } from "../../services/cart.services.js";
// import { CartManagerMongo } from "../controllers/cartManager.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "usuario",
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
},
    {
    timestamps: true,
    strict: false,
    }
    );

    userSchema.pre('save', async function(next){
        if(!this.cart) {
            try {
                const newCart = await createCart()
                this.cart = newCart._id

                next()
            }catch (error){
                next(error)
            }
        }else {
            next()
        }
    })

export const UserSchema = model('users', userSchema);