import clientModel from "../models/client.model"
import companyModel from "../models/company.model"
import guardModel from "../models/guard.model"
import userModel from "../models/user.model"
import { Days, EmploymentType } from "../schemas/guard.shcema"
import { UserRole } from "../schemas/user.schema"
import { passwrodHashUtils } from "../utils/bcrypt.utils"

const userRepo = {
    async createUser(role: UserRole, email: string, password: string, name: string, phone: string) {
        // create password hash with generateHash method of bcrypt
        const passwordHash = await passwrodHashUtils.generateHash(password)

        const result = await userModel.create({
            email,
            password,
            passwordHash,
            phone,
            role,
        })

        return {
            async createClient(profile: string) {
                const clientResult = await clientModel.create({
                    _id: result._id,
                    name: name,
                    profile: profile,
                })

                return {
                    ...result.toObject(),
                    ...clientResult.toObject(),
                }
            },

            async createGuard(availability: Array<Days>, employmentType: EmploymentType, maxHoursPerWeek: number, profile: string,) {
                const guradResult = await guardModel.create({
                    _id: result._id,
                    name: name,
                    profile: profile,
                    availability: availability,
                    employmentType: employmentType,
                    maxHoursPerWeek: maxHoursPerWeek,
                })

                return {
                    ...result.toObject(),
                    ...guradResult.toObject(),
                }
            },

            async createCompany(media: Array<string>) {
                const companyResult = await companyModel.create({
                    _id: result._id,
                    name: name,
                    media: media,
                })

                return {
                    ...result.toObject(),
                    ...companyResult.toObject(),
                }
            }
        }
    },



    async findByEmail(email: string): Promise<Object | null> {
        const result = await userModel.aggregate([
            {
                $match: {
                    email: email,
                }
            },
            {
                $lookup: {
                    from: "company-details",
                    localField: "refId",
                    foreignField: "_id",
                    as: "companyProfile",
                }
            },
            {
                $lookup: {
                    from: "guard-details",
                    localField: "refId",
                    foreignField: "_id",
                    as: "guardProfile",
                }
            },
            {
                $lookup: {
                    from: "client-details",
                    localField: "refId",
                    foreignField: "_id",
                    as: "clientProfile",
                }
            },
            {
                $addFields: {
                    profile: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$role", "company"] },
                                    then: { $arrayElemAt: ["$companyProfile", 0] },
                                },
                                {
                                    case: { $eq: ["$role", "guard"] },
                                    then: { $arrayElemAt: ["$guardProfile", 0] },
                                },
                                {
                                    case: { $eq: ["$role", "client"] },
                                    then: { $arrayElemAt: ["$clientProfile", 0] },
                                },
                            ],
                            default: null,
                        }
                    }
                }
            },
            {
                $project: {
                    companyProfile: 0,
                    guardProfile: 0,
                    clientProfile: 0,
                }
            },
            { $limit: 1 }
        ])

        return result[0] ?? null
    }
}

export default userRepo