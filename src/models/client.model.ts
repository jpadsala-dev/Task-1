import { model } from "mongoose"
import clientSchema, { Client } from "../schemas/client.schema"

export default model<Client>("client-details", clientSchema)