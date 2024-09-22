import mongoose from "mongoose";
import { userValidation } from "../zod/user.zod";
import * as zod from 'zod'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

type userType = zod.infer<typeof userValidation>

interface userInterface extends userType {
    cart: mongoose.Types.ObjectId[],
    isPasswordCorrect: (password: string) => Promise<string>,
    generateAccessToken: () => string,
    generateRefreshToken: () => string
}

const userSchema = new mongoose.Schema<userInterface>(
    {
        email: {
            type: String,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        ]
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next){

    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 5)
    next()
})

userSchema.methods.isPasswordCorrect = function(password: string){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            email: this.email
        },
        `${process.env.ACCESS_SECRET}`,
        {expiresIn: process.env.ACCESS_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id
        },
        `${process.env.REFRESH_SECRET}`,
        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}

export const User = mongoose.model<userInterface>("User", userSchema)


