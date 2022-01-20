import { QueryTypes } from 'sequelize'
import { sequelize } from './utils/db.js'

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
