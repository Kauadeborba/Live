import { badRequest } from '../lib/errors.js'

export const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source] ?? {})
  if (!result.success) {
    throw badRequest('Dados inválidos', result.error.issues.map(({ path, message }) => ({ field: path.join('.'), message })))
  }
  req.valid = { ...req.valid, [source]: result.data }
  next()
}
