import {Request, Response, NextFunction} from 'express'
import ApiError from '../../common/utils/api-error.js'
import { verifyAccessToken } from '../../common/utils/jwt-utils.js'
import prisma from '../../config/prisma.js'

const checkToken = async (req: Request & {user?: any}, res: Response, next: NextFunction) => {
    let token
    if(req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization?.split(' ')[1]
    }
    
    if(!token) throw ApiError.unauthorized("Not authenticated")

    const decoded = await verifyAccessToken(token)

    if(!decoded) throw ApiError.unauthorized("Invalid token")

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        },
        omit: {
            password: true,
            refreshToken: true
        }
    })

    if(!user) throw ApiError.unauthorized("User not found")

    req.user = user
    next()
}

const checkRole = (roles : string[]) => {
    roles = roles.map(ele => ele.toLowerCase())

    return (req: Request & {user?: any}, res: Response, next: NextFunction) =>{

    const user = req.user
    if(!user) throw ApiError.unauthorized("User not found")
    if(!roles.includes(user.role.toLowerCase())) throw ApiError.forbidden("Forbidden")

    next()
    }
}

export {
    checkToken,
    checkRole
}