import ApiError from "../../common/utils/api-error.js"
import prisma from "../../config/prisma.js"
import { updateInput } from "./dto/user.dto.js"

const getAll = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true, refreshToken: true
        }
    })

    if (!users){
        throw ApiError.notFound("Users not found")
    }

    return users
}

const update = async ({id, role, status} : updateInput) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        omit: {
            password: true, refreshToken: true
        }
    })

    if (!user){
        throw ApiError.notFound("User not found")
    }

    const updatedUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            isActive : status ?? user.isActive,
            role : role ?? user.role
        },
        omit: {
            password: true, refreshToken: true
        }
    })

    if (!updatedUser){
        throw ApiError.internal("Failed to update user status")
    }

    return updatedUser
}

const deleteUser = async ({id}: {id: string}) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        omit: {
            password: true, refreshToken: true
        }
    })

    if (!user){
        throw ApiError.notFound("User not found")
    }

    const deletedUser = await prisma.user.delete({
        where: {
            id
        },
        omit:{
            password: true, refreshToken: true
        }
    })

    if (!deletedUser){
        throw ApiError.internal("Failed to delete user")
    }

    return deletedUser
}

export {
    getAll,
    update,
    deleteUser
}