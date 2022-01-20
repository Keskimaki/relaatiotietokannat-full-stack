import express from 'express'
import { Op } from 'sequelize'
import { Blog, User } from '../models/index.js'
import { blogFinder, tokenExtractor } from '../utils/middlewares.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where.title = {
      [Op.substring]: req.query.search
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: 'userId' },
    include: {
      model: User
    },
    where
  })
  
  res.json(blogs)
})

blogRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

blogRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)
  if (!blog) {
    res.status(404).end()
  } else if (blog.userId !== user.id) {
    res.status(401).end()
  } else {
    await blog.destroy()
    res.status(204).end()
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
