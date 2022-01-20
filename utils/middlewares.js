import jwt from 'jsonwebtoken'
import env from './config.js'

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

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), env.SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
