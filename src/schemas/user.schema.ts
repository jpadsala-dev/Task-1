import { Document, Schema } from "mongoose"

export interface User extends Document {
    email: String,
    password?: String | null,
    passwordHash?: String | null,
    role: "company" | "client" | "guard"
    phone: String,
}

const userSchema = new Schema<User>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    passwordHash: {
        type: String,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["company", "client", "guard"]
    },
    phone: {
        type: String,
        required: true,
    }
})


export default userSchema