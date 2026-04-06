import {Router} from 'express'
import validate from '../../common/middleware/validate.middleware.js'
import * as authController from './user.controller.js'
import { updateDto, updateInput } from './dto/user.dto.js'
import { checkRole, checkToken } from '../auth/auth.middleware.js'

const userRouter: Router = Router()

userRouter.get("/get-users", checkToken, checkRole(["admin"]), authController.getAll)
userRouter.patch("/update/:id", checkToken, checkRole(["admin"]), validate(updateDto), authController.update)
userRouter.delete("/:id", checkToken, checkRole(["admin"]), authController.deleteUser)

export default userRouter