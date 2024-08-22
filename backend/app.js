import express from 'express'
import tasksRouter from "./routes/tasksRouter.js"
import usersRouter from "./routes/usersRouter.js"
import globalErrorHandler from './middleware/errorHandler.js'

import cors from "cors"
import morgan from "morgan"
import AppError from './utils/AppError.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json()); // To parse incoming JSON requests
app.use(express.urlencoded({extended: true} ))
app.use(cookieParser())

// const todos = [
//     {
//         _id: 1,
//         title:"Do something 1",
//         descreption: "bkbbkabkakbakbabkak"
//     },
//     {
//         _id: 2,
//         title:"Do something 2",
//         descreption: "bkbbkabkakbakbabkak"
//     },
//     {
//         _id: 3,
//         title:"Do something 3",
//         descreption: "bkbbkabkakbakbabkak"
//     },
//     {
//         _id: 4,
//         title:"Do something 4",
//         descreption: "bkbbkabkakbakbabkak"
//     },
//     {
//         _id: 5,
//         title:"Do something 5",
//         descreption: "bkbbkabkakbakbabkak"
//     }
// ]
const users = [
    {
        _id: 1,
        name: "kobi",
        email: "kobi@sat.com"
    },
    {
        _id: 2,
        name: "kobi2",
        email: "kobi@sat.com"
    },
    {
        _id: 3,
        name: "kobi",
        email: "kobi@sat.com"
    },
    {
        _id: 4,
        name: "kobi",
        email: "kobi@sat.com"
    },
    {
        _id: 5,
        name: "kobi",
        email: "kobi@sat.com"
    }
]

app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res, next)=>{
    return next(new AppError(404, 'Route not exists'))
})

app.use(globalErrorHandler)
export default app