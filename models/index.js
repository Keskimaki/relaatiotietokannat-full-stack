const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./userBlogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlogs, as: 'markedBlogs' })
User.belongsToMany(User, { through: UserBlogs, as: 'usersMarked' })

module.exports = { Blog, User }
