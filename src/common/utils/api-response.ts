import {Response} from 'express'

export default class ApiResponse{
    static ok(res: Response, message: string, data?: any){
        return res.status(200).json({ message, data: data || null })
    }

    static created(res: Response, message: string, data?: any){
        return res.status(200).json({ message, data: data || null })
    }

    static notFound(res: Response, message = "Not found"){
        return res.status(404).json({ message })
    }
}
