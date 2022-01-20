require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const printBlogs = async () => {
  const query = "SELECT * FROM blogs;"
  const blogs = await sequelize.query(query, { type: QueryTypes.SELECT })
  blogs.forEach(blog => {
    console.log(`${blog.author ? blog.author : 'unknown' }: '${blog.title}', ${blog.likes} likes`)
  })
}

const main = async () => {
  try {
    await sequelize.authenticate()
    await printBlogs()
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
