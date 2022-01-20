import express from 'express'
import { Op } from 'sequelize'
import { Blog } from '../models/index.js'
import { sequelize } from '../utils/db.js'

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

export default authorRouter
