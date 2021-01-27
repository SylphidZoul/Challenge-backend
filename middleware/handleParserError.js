const Response = require('../utils/response')

const handleParserError = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return Response.error(res, 'Invalid JSON body', 400, err)
  }
  next()
}

module.exports = handleParserError
