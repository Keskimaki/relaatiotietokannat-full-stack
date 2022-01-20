import 'dotenv/config'

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

const env = {
  PORT,
  DATABASE_URL
}

export default env
