const jwt = require('jsonwebtoken')
const { JWT: { SECRET } } = require('../config')
const Response = require('../utils/response')

const getToken = (req) => {
  if (!req.headers.authorization) throw new Error('Token not found!')
  if (req.headers.authorization.indexOf('Bearer ') === -1) throw new Error('Invalid token format!')

  const token = req.headers.authorization.replace('Bearer ', '')

  return token
}

const verifyToken = (req, res, next) => {
  try {
    const token = getToken(req)
    const user = jwt.verify(token, SECRET)
    req.user = user
    next()
  } catch (error) {
    Response.error(res, error.message, 400, error)
  }
}

module.exports = verifyToken
