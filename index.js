import http from 'http'
import app from './app.js'
import { connectToDatabase } from './utils/db.js'
import env from './utils/config.js'

const server = http.createServer(app)
const PORT = env.PORT || 3001

const start = async () => {
  await connectToDatabase()
  server.listen(PORT, () => {
    console.log('Server running on port', PORT)
  })
}

start()
