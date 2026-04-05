import {Router} from 'express'
import * as authController from './auth.controller.js'
import validate from '../../common/middleware/validate.middleware.js'
import {registerDto, loginDto } from './dto/auth.dto.js'
import { checkRole, checkToken } from './auth.middleware.js'

const authRouter: Router = Router()

authRouter.get("/test", checkToken, await checkRole(["viewer"]), (req, res) => {
    res.send("/auth/test - testing")
})

authRouter.post("/register", validate(registerDto), authController.register)
authRouter.post("/login", validate(loginDto), authController.login)


export default authRouter