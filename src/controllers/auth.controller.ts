import { NextFunction, Request, Response } from "express"
import service from "../services/auth.service"
import catchAsync from "../utils/catchAsync"

const controller = {
    registerHandler: (req: Request, res: Response, next: NextFunction) => {

    },

    loginHandler:
        catchAsync((req: Request, res: Response, next: NextFunction) => {
            const { email, password } = req.body

            var data = service.login({ email: email, password: password })

            if (data != null) {
                res.success({ data: data })
            } else {
                res.failed({ data: null, message: "Invalid email or password" })
            }

        })
}


export default controller