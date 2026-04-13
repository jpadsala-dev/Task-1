import { model } from "mongoose";
import guardShiftSchema, { GuardShift } from "../schemas/guard-shift.schema";

export default model<GuardShift>("guard-shift", guardShiftSchema);
