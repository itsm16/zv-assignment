import z from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class updateDto extends BaseDto{
    static schema = z.object({
        status: z.boolean({error: "Requires boolean value"}).optional(),
        role: z.enum(["ADMIN", "ANALYST", "VIEWER"], {error: "must be one of: ADMIN, ANALYST, VIEWER"}).optional(),
    })
}

type updateInput = {
    id: string
} & z.infer<typeof updateDto.schema>

export {
    updateDto,
}

export type {
    updateInput
}