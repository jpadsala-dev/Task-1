import { Router } from "express"
import AuthRouter from "./auth.routes"

const router = Router()

router.use('/company', AuthRouter)

export default router

