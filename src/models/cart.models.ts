import mongoose from "mongoose"

interface cartInterface {
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    qty: number
}

const cartSchema = new mongoose.Schema<cartInterface>(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            default: 1
        }
    }
)

export const Cart = mongoose.model("Cart", cartSchema)