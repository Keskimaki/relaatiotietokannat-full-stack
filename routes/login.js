const jwt = require('jsonwebtoken')
const express = require('express')
const { User } = require('../models/index')
const env = require('../utils/config')

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log(username.body)
  const user = await User.findOne({ where: { username } })

  const passwordCorrect = password === 'salasana'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(userToken, env.SECRET)

  res.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter
