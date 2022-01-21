const express = require('express')
const { Op } = require('sequelize')
const { Blog } = require('../models/index')
const { sequelize } = require('../utils/db')

const authorRouter = express.Router()

authorRouter.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    where: {
      author: {
        [Op.not]: null
      }
    }
  })

  res.json(authors)
})

module.exports = authorRouter
