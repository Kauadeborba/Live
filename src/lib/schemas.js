import { z } from 'zod'

const MAX_INT = 2_147_483_647

export const intId = () => z.coerce.number().int().positive().max(MAX_INT)
export const cents = () => z.coerce.number().int().min(0).max(MAX_INT)
