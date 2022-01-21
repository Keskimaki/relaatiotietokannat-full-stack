const express = require('express')
const { ReadingList } = require('../models/index')

const readingListRouter = express.Router()

readingListRouter.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

module.exports = readingListRouter
