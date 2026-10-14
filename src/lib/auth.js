import jwt from 'jsonwebtoken'

const secret = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET não definido no .env')
  return process.env.JWT_SECRET
}

export const signToken = (user) => jwt.sign({ sub: user.id }, secret(), { expiresIn: '7d' })
export const verifyToken = (token) => jwt.verify(token, secret())
