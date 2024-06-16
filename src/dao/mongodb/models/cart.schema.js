import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    products: [
        {
            id_prod: {
                type: Schema.Types.ObjectId, 
                ref: "products",
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ]
})

CartSchema.pre("findOne", function () {
    this.populate("products.id_prod")
})

export default model("Cart", CartSchema)