const Sequelize = require('sequelize')
const Umzug = require('umzug')
const env = require('./config')

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (error) {
    console.log('connecting to database failed')
    return process.exit(1)
  }

  return null
}
