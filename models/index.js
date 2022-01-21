const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'markedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'usersMarked' })

User.hasMany(ReadingList)
//ReadingList.belongsTo(User)
//Blog.hasMany(ReadingList)
//ReadingList.belongsTo(Blog)

module.exports = { Blog, User, ReadingList }
