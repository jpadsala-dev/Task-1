import { Document, Schema } from "mongoose"

export interface Company extends Document {
    name: String,
    media?: Array<string>,
}

const companySchema = new Schema<Company>({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    name: {
        type: String,
        required: [true, "Company name is required"]
    },
    media: [String],
})

export default companySchema