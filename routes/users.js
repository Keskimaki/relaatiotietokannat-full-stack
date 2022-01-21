const express = require('express')
const { User, Blog, ReadingList } = require('../models/index')

const userRouter = express.Router()

userRouter.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: 'userId' }
    }
  })
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, { 
    include:[{
        model: Blog,
        attributes: { exclude: 'userId' }
      },
      {
        model: Blog,
        as: 'markedBlogs',
        attributes: { exclude: 'userId'},
        through: {
          attributes: []
        }
      },
      {
        model: ReadingList,
        attributes: { exclude: ['userId', 'blogId']}
      }
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

userRouter.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter
