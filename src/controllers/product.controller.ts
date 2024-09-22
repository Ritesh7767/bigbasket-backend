import { Product } from "../models/product.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";

const getProducts = asyncHandler(async (req, res) => {
    
    const value = req.query.category

    const data = await Product.aggregate([
        {
            $match: {
                category: value
            }
        }
    ])

    if (!data) throw new ApiError(500, "Product does not exist of this category")
    res.status(200).json(new ApiResponse(500, data))
})

