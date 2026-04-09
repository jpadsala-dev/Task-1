import app from "./app"
import connectDB from "./config/db"
import env from "./config/env"

import expressDeclration from "./utils/express.declarations"

expressDeclration()

connectDB().then(
    () => {
        app.listen(env.port, (_) => {
            console.log(`Server running at http://localhost:${env.port}`)
        })
    }
)
