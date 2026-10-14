import serverless from 'serverless-http'
import { createApp } from '../../src/app.js'

export const handler = serverless(createApp(), {
  request(req, event) {
    if (event.rawUrl) {
      const { pathname, search } = new URL(event.rawUrl)
      req.url = pathname + search
    }
  },
})
