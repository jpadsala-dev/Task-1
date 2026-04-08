import { Schema } from "mongoose"

export interface Guard extends Document {
    name: String,
    profile: String,
    availability: Array<Days>,
    employmentType: "full-time" | "part-time",
    maxHoursPerWeek: Number,
}

enum Days {
    Mon = "mon",
    Tue = "tue",
    Wed = "wed",
    Thu = "thu",
    Fri = "fri",
    Sat = "sat",
    Sun = "sun"
}

const guardSchema = new Schema<Guard>(
    {
        name: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: true,
        },
        availability: {
            type: [String],
            enum: Object.values(Days),
            required: true,
        },
        employmentType: {
            type: String,
            enum: ["full-time", "part-time"],
            required: true,
        },
        maxHoursPerWeek: {
            type: Number,
            required: true,
        }
    }
)

export default guardSchema