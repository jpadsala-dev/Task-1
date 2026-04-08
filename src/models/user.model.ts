import { model } from "mongoose"
import userSchema, { User } from "../schemas/user.schema"

export default model<User>("users", userSchema)