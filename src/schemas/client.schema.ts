import { Document, Schema } from "mongoose"

export interface Client extends Document {
    name: String,
    profile: String,
}

const clientSchema = new Schema<Client>({
    name: {
        type: String,
        required: [true, "Client name is required"],
    },
    profile: {
        type: String,
        required: [true, "Client profile is required"],
    },
})

export default clientSchema