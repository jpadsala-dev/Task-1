import { model } from "mongoose"
import guardSchema, { Guard } from "../schemas/guard.shcema"

export default model<Guard>("guard-details", guardSchema)