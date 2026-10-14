import { execSync } from 'node:child_process'

export default function setup() {
  execSync('npx prisma db push --skip-generate', {
    env: { ...process.env, DATABASE_URL: 'postgresql://live:live@localhost:5433/live_test' },
    stdio: 'ignore',
  })
}
