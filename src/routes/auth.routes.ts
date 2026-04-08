import { Router } from "express"
import controller from "../controllers/auth.controller"

const AuthRouter = Router()

AuthRouter.post('/register', controller.registerHandler)

AuthRouter.post('/login', controller.loginHandler)

export default AuthRouter