const http =  require('http')
const app = require('./app')
const { connectToDatabase } = require('./utils/db')
const env = require('./utils/config.js')

const server = http.createServer(app)
const PORT = env.PORT || 3001

const start = async () => {
  await connectToDatabase()
  server.listen(PORT, () => {
    console.log('Server running on port', PORT)
  })
}

start()
