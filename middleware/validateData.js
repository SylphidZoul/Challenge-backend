const Response = require('../utils/response')

const validateData = (schema, check = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[check])
  error
    ? Response.error(res, `The ${error.details[0].path[0]} is not valid or not allowed.`, 400, error)
    : next()
}

module.exports = validateData
