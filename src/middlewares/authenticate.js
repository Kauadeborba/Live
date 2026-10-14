import { verifyToken } from '../lib/auth.js'
import { unauthorized } from '../lib/errors.js'
import { prisma } from '../lib/prisma.js'

export async function authenticate(req, _res, next) {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ')
  if (scheme !== 'Bearer' || !token) throw unauthorized()
  let userId
  try {
    userId = verifyToken(token).sub
  } catch {
    throw unauthorized('Token inválido ou expirado')
  }
  if (!(await prisma.user.findUnique({ where: { id: userId }, select: { id: true } }))) throw unauthorized('Usuário não existe mais')
  req.userId = userId
  next()
}
