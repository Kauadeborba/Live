import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'node:url'
import { openapi } from './openapi.js'
import { authRoutes } from './modules/auth.routes.js'
import { catalogRoutes } from './modules/catalog.routes.js'
import { cartRoutes } from './modules/cart.routes.js'
import { orderRoutes } from './modules/orders.routes.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const publicDir = fileURLToPath(new URL('../public', import.meta.url))

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
  app.use('/api/auth', authRoutes)
  app.use('/api', catalogRoutes)
  app.use('/api/cart', cartRoutes)
  app.use('/api/orders', orderRoutes)
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi))
  app.use('/api', notFoundHandler)

  app.use(express.static(publicDir, { extensions: ['html'] }))
  app.use(errorHandler)
  return app
}
