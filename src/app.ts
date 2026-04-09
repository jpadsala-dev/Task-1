import express from "express"
import loggerMiddlware from "./middlewares/logger.middlware"
import router from "./routes/routes"
import { errorHandler } from "./utils/errorHandler"

const app = express()

app.use(express.json())

app.use(loggerMiddlware)

app.use('/api/v1', router)

app.use(errorHandler)

export default app