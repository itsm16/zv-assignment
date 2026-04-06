import express, { Express } from 'express'
import authRouter from './modules/auth/auth.route.js';
import userRouter from './modules/user/user.route.js';
import recordsRouter from './modules/records/records.route.js';

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/records", recordsRouter)

export default app;