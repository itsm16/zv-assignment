import {Router} from 'express'
import validate from '../../common/middleware/validate.middleware.js';
import * as recordController from './records.controller.js'
import { createRecordDto, updateRecordDto } from './dto/records.dto.js';
import { checkRole, checkToken } from '../auth/auth.middleware.js';

const recordsRouter : Router = Router();

recordsRouter.post("/", checkToken, checkRole(["admin"]), validate(createRecordDto ), recordController.create)
recordsRouter.delete("/:id", checkToken, checkRole(["admin"]), recordController.deleteRecord)
recordsRouter.get("/", checkToken, checkRole(["admin", "analyst"]), recordController.getAllRecords)
recordsRouter.get("/:id",checkToken, checkRole(["admin", "analyst"]), recordController.getById)
recordsRouter.put("/:id", checkToken, checkRole(["admin"]), validate(updateRecordDto), recordController.updateRecord)

export default recordsRouter