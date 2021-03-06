const express = require('express')
const { Op } = require('sequelize')
const { Blog, User, ActiveSession } = require('../models/index')
const { tokenExtractor } = require('../utils/middlewares')

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
  const session = await ActiveSession.findOne({ where: { userId: req.decodedToken.id }})
  if (!session) {
    res.status(401).end()
  }
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

blogRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const session = await ActiveSession.findOne({ where: { userId: req.decodedToken.id }})
  const blog = await Blog.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)

  if (!blog) {
    res.status(404).end()
  } else if (blog.userId !== user.id || !session) {
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

module.exports = blogRouter
