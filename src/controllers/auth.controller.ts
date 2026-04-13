import { Request, Response } from "express"
import authService from "../services/auth.service"
import catchAsync from "../utils/catchAsync"

const controller = {
    registerHandler: async (req: Request, res: Response) => {
        const { email, password, name, phone, availability, employmentType, maxHoursPerWeek, role } = req.body

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const profile = files?.profile?.[0]?.filename;
        const media = files?.media;

        var data = await authService.register({
            email,
            password,
            name,
            phone,
            profile,
            media,
            availability,
            employmentType,
            maxHoursPerWeek,
            role
        })

        return res.success({ data })
    },

    loginHandler:
        catchAsync(async (req: Request, res: Response) => {
            const { email, password } = req.body ?? {}

            const data = await authService.login({ email, password })

            return res.success({ data })

        })
}


export default controller