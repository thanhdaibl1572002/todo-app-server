import 'tsconfig-paths/register'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import todoRouter from '@/routes/todo.route'

config()

const app = express()
const PORT = 8080
const MONGO_DB_URL = 'mongodb+srv://truongthanhdai:qPyC12NZmVI2QjF0@project-database.jfaq7f0.mongodb.net/?retryWrites=true&w=majority'

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('dev'))
app.use(cookieParser())

// Route
app.use('/api', todoRouter)

connect(MONGO_DB_URL)
.then(() => app.listen(
    PORT, 
    () => console.log(`Application listening at http://localhost:${PORT}`)))
.catch((error: Error) => {
    console.log(error)
    process.exit(1)
})