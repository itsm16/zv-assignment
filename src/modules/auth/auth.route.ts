import {Router} from 'express'
import * as authController from './auth.controller.js'
import validate from '../../common/middleware/validate.middleware.js'
import {registerDto, loginDto, refreshDto } from './dto/auth.dto.js'
import { checkRole, checkToken } from './auth.middleware.js'

const authRouter: Router = Router()

authRouter.post("/register", validate(registerDto), authController.register)
authRouter.post("/login", validate(loginDto), authController.login)
authRouter.post("/refresh", validate(refreshDto), authController.refresh)

export default authRouter