import z from "zod";
import {Request, Response, NextFunction} from 'express'
import ApiError from "../utils/api-error.js";
import BaseDto from '../dto/base.dto.js'

const validate = (DtoClass: typeof BaseDto) => {
    return (req: Request, res: Response, next: NextFunction) =>{

        const {success, data, errors} = DtoClass.validate(req.body);
        
        if(errors){
            const errorMessage = errors.join('; ');
            throw ApiError.badRequest(errorMessage);
        }
        
        req.body = data;
        next();
    }
}

export default validate