import mongoose from "mongoose"

interface qtyInterface {
    qty: string,
    price: number,
    ogPrice: number
}

interface productInterface {
    image: string,
    brand: string,
    title: string,
    category: string,
    qty: qtyInterface[]
}

const productSchema = new mongoose.Schema<productInterface>(
    {
        image: String,
        brand: String,
        title: String,
        category: String,
        qty: [
            {
                qty: String,
                price: Number,
                ogPrice: Number
            }
        ]
    }
)

export const Product = mongoose.model("Product", productSchema)

