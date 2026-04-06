import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class createRecordDto extends BaseDto{
    static schema = z.object({
        amount : z.float32({error: "amount should be float"}).nonnegative().nonoptional(),
        type : z.enum(["EXPENSE", "INCOME"]),
        userId: z.string(),
        note: z.string().optional()
    })
}

class updateRecordDto extends BaseDto{
    static schema = z.object({
        amount : z.float32({error: "amount should be float"}).nonnegative().nonoptional(),
        type : z.enum(["EXPENSE", "INCOME"], {error: `type should be "EXPENSE" or "INCOME"`}),
        note: z.string().optional()
    })
}


// types
type createRecordInput = z.infer<typeof createRecordDto.schema>
type updateRecordInput = z.infer<typeof updateRecordDto.schema>
type updateRecordParams = {
    id: string
} & updateRecordInput

export {
    createRecordDto,
    updateRecordDto
}

export type {
    createRecordInput,
    updateRecordInput,
    updateRecordParams
}