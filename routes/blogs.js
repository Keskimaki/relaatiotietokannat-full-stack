import express from 'express'
import { Op } from 'sequelize'
import { Blog, User } from '../models/index.js'
import { blogFinder, tokenExtractor } from '../utils/middlewares.js'

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.substring]: req.query.search } },
        { author: { [Op.substring]: req.query.search } }
      ]
    }
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
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

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

export default blogRouter
