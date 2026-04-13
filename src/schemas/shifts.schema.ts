import { Document, Schema, Types } from "mongoose";

export interface Shift extends Document {
    companyId: Types.ObjectId,
    shiftName: string,
    startDateTime: string,
    endDateTime: string,
    location: string,
    media: Array<string> | null,
}

const shiftSchema = new Schema<Shift>(
    {
        companyId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        shiftName: { type: String, required: true },
        startDateTime: { type: String, required: true },
        endDateTime: { type: String, required: true },
        location: { type: String, required: true },
        media: { type: [String], default: null },
    },
    { timestamps: true }
)

export default shiftSchema
