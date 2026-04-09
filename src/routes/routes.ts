import { Router } from "express"
import AuthRouter from "./auth.routes"

const router = Router()

router.use(AuthRouter)

export default router