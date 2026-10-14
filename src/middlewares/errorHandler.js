import { HttpError } from '../lib/errors.js'

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Rota ${req.method} ${req.path} não existe` })
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, ...(err.details && { details: err.details }) })
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido' })
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Registro duplicado' })
  }
  if (err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Erro interno' })
}
