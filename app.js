import express from 'express'
import 'express-async-errors'
import blogRouter from './routes/blogs.js'
import { errorHandler } from './utils/middlewares.js'

const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.send('ok')
})

app.use('/api/blogs', blogRouter)

app.use(errorHandler)

export default app
