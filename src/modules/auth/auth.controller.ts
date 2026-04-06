import ApiResponse from '../../common/utils/api-response.js'
import * as authService from './auth.service.js'
import {Request, Response} from 'express'

const register = async (req: Request, res: Response) => {
    const user = await authService.register(req.body)
    ApiResponse.created(res, 'User created', user)
}

const login = async (req: Request, res: Response) => {
    const user = await authService.login(req.body)
    ApiResponse.ok(res, 'User logged in', user)
}

const refresh = async (req: Request, res: Response) => {
    const user = await authService.refresh(req.body)
    ApiResponse.ok(res, 'Tokens refreshed', user)
}

export {
    register,
    login,
    refresh
}