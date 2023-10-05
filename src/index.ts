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
const PORT = process.env.PORT

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('dev'))
app.use(cookieParser())

// Route
app.use('/api', todoRouter)

connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() => app.listen(
    PORT, 
    () => console.log(`Application listening at http://localhost:${PORT}`)))
.catch((error: Error) => {
    console.log(error)
    process.exit(1)
})