import { NextFunction, Request, Response } from "express"
import service from "../services/auth.service"
import { AppError } from "../utils/appError"
import catchAsync from "../utils/catchAsync"

const controller = {
    registerHandler: (req: Request, res: Response, next: NextFunction) => {
        res.end("Good!")
    },

    loginHandler:
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const { email, password } = req.body ?? {}
            console.log("Reached here!")

            if (!email || !password) {
                throw new AppError("Email and password are required", 400)
            }

            const data = await service.login({ email, password })

            return res.success({ data })

        })
}


export default controller