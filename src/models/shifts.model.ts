import { model } from "mongoose";
import shiftSchema, { Shift } from "../schemas/shifts.schema";

export default model<Shift>("shifts", shiftSchema);
