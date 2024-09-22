import { Cart } from "../models/cart.models";
import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import mongoose from "mongoose";

interface idInterface {
    id: mongoose.Schema.Types.ObjectId
}

const addToCart = asyncHandler(async (req, res) => {

    const id = req.params.id
    if (!id) throw new ApiError(400, "Bad Request")
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Product Id")

    const cart = await Cart.create({
        userId: req.id,
        productId: id,
    })
    
    res.status(201).json(new ApiResponse(201, cart, "Add to cart"))
})

const updateCart = asyncHandler(async (req, res) => {

    const id = req.params.id

    if (!id) throw new ApiError(400, "Bad Request")
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Product Id")
    
})