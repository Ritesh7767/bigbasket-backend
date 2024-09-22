import { Request, Response, NextFunction } from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'

export const IsAuth = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.cookies.accessToken
        const data = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as JwtPayload
        req.id = data.id
    } catch (error) {
        next(error)
    }
}