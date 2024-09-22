import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { userValidation } from "../zod/user.zod";

export const userRegister = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const isDataValid = userValidation.safeParse(req.body)
    if (!isDataValid.success) throw new ApiError(400, "Invalid data provided")

    const existingUser = await User.findOne({
        email
    })

    if (existingUser) throw new ApiError(402, "User already exist")

    const createdUser = await User.create(req.body)
    const user = await User.findById(createdUser._id).select("-password")

    if (!user) throw new ApiError(500, "Something went wrong while registering, please retry")
    res.status(200).json(new ApiResponse(200, user))
})

export const userLogin = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const isDataValid = userValidation.safeParse(req.body)
    if (!isDataValid.success) throw new ApiError(400, "Invalid data Provided")

    const user = await User.findOne({email}).select("-password")
    if (!user) throw new ApiError(404, "User does not exist")

    const isPassValid = await user.isPasswordCorrect(password)
    if (!isPassValid) throw new ApiError(400, "Invalid credentials")

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    const options = {
        httpOnly: true,
        secure: true
    }
    
    res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", refreshToken).json(new ApiResponse(200, user))
})

