import { defineConfig } from 'vitest/config'

const TEST_DATABASE_URL = 'postgresql://live:live@localhost:5433/live_test'

export default defineConfig({
  test: {
    env: { DATABASE_URL: TEST_DATABASE_URL, JWT_SECRET: 'test-secret' },
    globalSetup: './tests/global-setup.js',
    fileParallelism: false,
  },
})
