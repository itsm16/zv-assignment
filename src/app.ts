import express, { Express } from 'express'
import authRouter from './modules/auth/auth.route.js';

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)

export default app;