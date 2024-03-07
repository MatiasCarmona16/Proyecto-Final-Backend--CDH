import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [
        {
            id_prod: {
                type: Schema.Types.ObjectId, 
                ref: "Product",
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

const Carrito = mongoose.model('carts', CartSchema)
export default Carrito