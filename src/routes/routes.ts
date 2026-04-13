import { Router } from "express"
import AuthRouter from "./auth.routes"
import GuardShiftRouter from "./guard-shift.routes"
import ShiftsRouter from "./shifts.routes"

const router = Router()

router.use(AuthRouter)

router.use(ShiftsRouter)

router.use("/guard-shifts", GuardShiftRouter)

export default router