require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const SECRET = process.env.SECRET

const env = {
  PORT,
  DATABASE_URL,
  SECRET
}

module.exports = env
