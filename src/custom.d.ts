import { Express, Request } from "express";
import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            id: mongoose.Schema.Types.ObjectId
        }
    }
}