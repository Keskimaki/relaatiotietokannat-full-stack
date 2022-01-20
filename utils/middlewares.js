export const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

export const errorHandler = (error, _req, res, next) => {
  console.error(error.message)

  if (error.name == "ReferenceError") {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name == "SequelizeValidationError") {
    return res.status(400).send({ error: 'missing or malformatted data' })
  }

  next(error)
}
