import express from 'express'
import db from './config/db.js'
import indexRouter from './routes/index.js'
import clientsRouter from "./routes/clients.router.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";


const app = express()
app.use(express.json({limit: "20kb"}))
app.use(cookieParser())
app.use('/v1', indexRouter)
app.use('/v1/client', clientsRouter)
app.get('/', async (req, res) => {
    console.log((await db.query('SELECT now() AS time;')).rows[0].time)
    res.send("Hello World")
})

app.use((req, res) => {
    res.status(404).json({error: 'Not Found'})
})

export default app