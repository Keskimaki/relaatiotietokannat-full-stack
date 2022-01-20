import express from 'express'
import { Blog } from '../models/index.js'
import { blogFinder } from '../utils/middlewares.js'

const blogRouter = express.Router()

blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.json(blog)
})

blogRouter.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

blogRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

export default blogRouter
