import userRepo from "../repository/user.repository"
import { AppError } from "../utils/appError"
import { passwrodHashUtils } from "../utils/bcrypt.utils"

const service = {
    register(arg: { email: string, password: string, name: string, profile?: string, phone: string, media?: Array<string>, }) {

    },

    async login(arg: { email: string; password: string }): Promise<Object | null> {

        var result = await userRepo.findByEmail(arg.email)

        console.log(result)


        if (result !== null) {
            const isMatch = await passwrodHashUtils.compareValue(arg.password, (result as any).password as string)

            if (isMatch) {
                return result
            }

        }

        throw new AppError("Invalid email or password", 401)
    },
}

export default service