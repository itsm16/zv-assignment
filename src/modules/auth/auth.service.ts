import ApiError from "../../common/utils/api-error.js"
import { generateAccessToken, generateHash, generateRefreshToken } from "../../common/utils/jwt-utils.js"
import prisma from "../../config/prisma.js"

const register = async ({name, email, password}: {name: string, email: string, password: string}) => {
    const existing = await prisma.user.findFirst({
        where: {
            email: email as string
        }
    })

    if (existing) {
        throw ApiError.conflict('User already exists')
    }

    const hashedPassword = await generateHash(password)

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
            // add verification token later
        },
        omit: {password: true}
    })

    return newUser
}

const login = async ({email, password}: {email: string, password: string}) => {
    const user = await prisma.user.findFirst({
        where: {
            email: email as string
        },

    })

    if(!user) throw ApiError.notFound('User not found')

    const hashedPassword = await generateHash(password)

    if(hashedPassword !== user.password){
        throw ApiError.unauthorized('Invalid password')    
    }

    const accessToken = generateAccessToken({id: user.id, role: user.role})
    const refreshToken = generateRefreshToken({id: user.id})
    const hashedRefreshToken = await generateHash(refreshToken)

    const updatedUser = await prisma.user.update({
        where:{
            id: user.id
        },
        data:{
            refreshToken: hashedRefreshToken
        },
        omit: {password: true, refreshToken: true}
    })

    return {
        user: updatedUser,
        accessToken,
        refreshToken
    }
}

export {
    register,
    login
}