import { Router } from "express";
import controller from "../controllers/guard-shift.controller";
import { authenticate } from "../middlewares/auth.middleware";

const guardShiftRouter = Router();

guardShiftRouter.use(authenticate);

guardShiftRouter.post("/assign", controller.assignGuardToShift);

guardShiftRouter.delete("/remove", controller.removeGuardFromShift);

guardShiftRouter.get("/guard/:guardId", controller.getGuardShifts);

guardShiftRouter.get("/shift/:shiftId", controller.getShiftGuards);

guardShiftRouter.patch("/status", controller.updateAssignmentStatus);

guardShiftRouter.get("/check", controller.checkGuardAssignment);

guardShiftRouter.get("/all", controller.getAllAssignments);

export default guardShiftRouter;
