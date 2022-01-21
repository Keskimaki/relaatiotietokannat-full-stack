const express = require('express')
const { ReadingList, User } = require('../models/index')
const { tokenExtractor } = require('../utils/middlewares')

const readingListRouter = express.Router()

readingListRouter.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

readingListRouter.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  const user = await User.findByPk(req.decodedToken.id)

  if (!readingList) {
    res.send(404).end()
  } else if (readingList.userId !== user.id) {
    res.status(401).end()
  } else {
    readingList.read = req.body.read
    await readingList.save()
    res.json(readingList)
  }
})

module.exports = readingListRouter
