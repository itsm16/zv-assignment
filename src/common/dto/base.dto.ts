import z from 'zod'

class BaseDto{
    static schema = z.object({})

    static validate(data: object){
        const {success, data: validatedData, error} = this.schema.safeParse(data)
        
        if(error){
            const errors = error.issues.map(issue => issue.message)
            return {errors, data: null}
        }
        
        return { success, data: validatedData, errors: null }
    }
}

export default BaseDto