import express from 'express'
import 'express-async-errors'
import blogRouter from './routes/blogs.js'
import userRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import authorRouter from './routes/authors.js'
import { errorHandler } from './utils/middlewares.js'

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

export default app
