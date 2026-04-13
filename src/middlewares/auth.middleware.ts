import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { jwtUtils } from "../utils/jwt.utils"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                role: string
            }
        }
    }
}

export const authenticate = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        const token = jwtUtils.extractTokenFromHeader(authHeader)
        const decoded = jwtUtils.verifyToken(token)

        req.user = decoded
        next()
    }
)
