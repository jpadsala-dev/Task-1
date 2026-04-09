import { Document, Schema } from "mongoose"

export interface User extends Document {
    email: String,
    password?: String | null,
    passwordHash?: String | null,
    role: UserRole
    phone: String,
}

enum UserRole {
    company = "company",
    client = "client",
    guard = "guard",
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
        enum: Object.values(UserRole),
    },
    phone: {
        type: String,
        required: true,
    }
})


export default userSchema