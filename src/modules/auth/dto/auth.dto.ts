import z from 'zod'
import BaseDto from '../../../common/dto/base.dto.js'

class registerDto extends BaseDto {
    static schema = z.object({
        name: z.string(),
        email: z.email({error: 'Invalid email'}).nonempty({error: 'Email is required'}),
        password: z.string().min(8, {error: 'Password must be at least 8 characters'}).nonempty({error: 'Password is required'}).nonoptional(),
    })
}

class loginDto extends BaseDto {
    static schema = z.object({
        email: z.email({error: 'Invalid email'}).nonempty({error: 'Email is required'}),
        password: z.string().min(8, {error: 'Password must be at least 8 characters'}).nonempty({error: 'Password is required'}).nonoptional(),
    })
}

class refreshDto extends BaseDto {
    static schema = z.object({
        refreshToken: z.string().nonempty({error: 'Refresh token is required'}),
    })
}

export {registerDto, loginDto, refreshDto}