import * as zod from 'zod'

export const userValidation = zod.object({
    email: zod.string().email().optional(),
    password: zod.string().min(8, "password cannot be less then 8 characters")
})
