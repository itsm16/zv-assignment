import jwt from 'jsonwebtoken'
import crypto, { createHash, randomBytes } from 'crypto'

const generateHash = async (str: string) => {
    const hashed = crypto.createHash("sha256").update(str).digest("hex")
    return hashed
}

const generateAccessToken = (payload: {id: string, role: string}) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' })
}

const verifyAccessToken = async (token: string) : Promise<{id: string, role: string}>=> {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as {id: string, role: string}
}

const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '24h' })
}

const verifyRefreshToken = async (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
}

export {
    generateHash,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}