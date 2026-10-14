import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { signToken } from '../lib/auth.js'
import { conflict, unauthorized, notFound } from '../lib/errors.js'
import { validate } from '../middlewares/validate.js'
import { authenticate } from '../middlewares/authenticate.js'

const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email().toLowerCase(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(1),
})

const publicUser = ({ id, name, email, createdAt }) => ({ id, name, email, createdAt })

export const authRoutes = Router()

authRoutes.post('/register', validate(registerSchema), async (req, res) => {
  const { name, email, password } = req.valid.body
  if (await prisma.user.findUnique({ where: { email } })) throw conflict('E-mail já cadastrado')
  const user = await prisma.user.create({
    data: { name, email, passwordHash: await bcrypt.hash(password, 10) },
  })
  res.status(201).json({ user: publicUser(user), token: signToken(user) })
})

authRoutes.post('/login', validate(loginSchema), async (req, res) => {
  const { email, password } = req.valid.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw unauthorized('E-mail ou senha incorretos')
  res.json({ user: publicUser(user), token: signToken(user) })
})

authRoutes.get('/me', authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } })
  if (!user) throw notFound('Usuário não encontrado')
  res.json(publicUser(user))
})
