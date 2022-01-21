const jwt = require('jsonwebtoken')
const express = require('express')
const { User, ActiveSession } = require('../models/index')
const { tokenExtractor } = require('../utils/middlewares')
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

  const session = {userId: user.id, token}
  await ActiveSession.create(session)

  res.status(200).send({ token, username, name: user.name })
})

loginRouter.delete('/', tokenExtractor, async (req, res) => {
  const session = await ActiveSession.findAll({ where: { userId: req.decodedToken.id }})
  session.forEach(ses => {
    ses.destroy()
  })
  res.status(200).end()
})

module.exports = loginRouter
