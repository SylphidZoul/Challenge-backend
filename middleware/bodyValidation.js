const Response = require('../utils/response')

const bodyValidation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  error ? Response.error(res, `The ${error.details[0].path[0]} is not valid.`, 400, error) : next()
}

module.exports = bodyValidation
