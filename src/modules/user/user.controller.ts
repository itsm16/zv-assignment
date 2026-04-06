import {Request, Response} from 'express'
import * as userService from './user.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const getAll = async (req: Request, res: Response) => {
    const getAll = await userService.getAll()
    ApiResponse.ok(res, "Users retrieved successfully", getAll)
}

const update = async (req: Request, res:Response) => {
    const updatedUser = await userService.update({id: req.params.id, ...req.body})
    ApiResponse.ok(res, "Status updated successfully", updatedUser)
}

const deleteUser = async (req: Request, res: Response) => {
    const deleted = await userService.deleteUser({id: req.params.id as string})
    ApiResponse.ok(res, "User deleted successfully", deleted)
}

export {
    getAll,
    update,
    deleteUser
}