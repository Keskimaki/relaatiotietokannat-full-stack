const express = require('express')
require('express-async-errors');
const blogRouter = require('./routes/blogs')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const authorRouter = require('./routes/authors')
const { errorHandler } = require('./utils/middlewares')

const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.send('ok')
})

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

app.use(errorHandler)

module.exports = app
