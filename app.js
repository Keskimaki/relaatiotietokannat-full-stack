import express from 'express'
import blogRouter from './routes/blogs.js'

const app = express()
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.send('ok')
})

app.use('/api/blogs', blogRouter)

export default app
