import { createApp } from './app.js'

if (!process.env.JWT_SECRET) {
  console.error('Defina JWT_SECRET no .env (veja .env.example)')
  process.exit(1)
}

const port = Number(process.env.PORT ?? 3000)

createApp().listen(port, () => {
  console.log(`Live rodando em http://localhost:${port}  ·  docs em http://localhost:${port}/docs`)
})
