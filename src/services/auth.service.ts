import userRepo from "../repository/user.repository"
import { Days, EmploymentType } from "../schemas/guard.shcema"
import { UserRole } from "../schemas/user.schema"
import { AppError } from "../utils/appError"
import { passwrodHashUtils } from "../utils/bcrypt.utils"

const service = {
    async register(arg: {
        email: string,
        password: string,
        name: string,
        profile?: string,
        phone: string,
        role: UserRole,
        media?: Express.Multer.File[],
        availability?: Array<Days>,
        maxHoursPerWeek?: number,
        employmentType?: EmploymentType
    }) {
        let response: Object | null;
        var result = await userRepo.createUser(arg.role, arg.email, arg.password, arg.name, arg.phone)

        switch (arg.role) {
            case UserRole.client:
                response = await result.createClient(arg.profile!);
                break
            default:
                response = null
                break
        }

        console.log(response)


        return response
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