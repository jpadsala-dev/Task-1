import userModel from "../models/user.model"

const userRepo = {
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