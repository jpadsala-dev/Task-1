import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"
import { AppError } from "../utils/appError"

type ValidationType = "body" | "query" | "params"

export const validate = (schema: ObjectSchema, type: ValidationType = "body") => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req[type])
        console.log(req.file)
        console.log(req.files)

        // Ensure req[type] exists before validating, otherwise send a 400 error
        if (!req[type]) {
            throw new AppError(`Missing request ${type}`, 400)

        }

        const { error, value } = schema.validate(req[type], {
            abortEarly: false,
            stripUnknown: true,
        })

        if (error) {
            next(error)
        }

        req[type] = value
        next()
    }
}
