const Response = require('../utils/response')

const generateErrorMessage = (failedInput) => {
  switch (failedInput) {
    case 'concept':
      return 'The concept must be alphanumeric between 1 and 50 characters.'
    case 'amount':
      return 'The amount cannot be negative or greater than 8 digits. '
    case 'date':
      return 'The date cannot be greather than today.'
    case 'username':
      return 'The username must be alphanumeric between 5 and 40 characters.'
    case 'email':
      return 'Please enter a valid email.'
    case 'password':
      return 'The password must be alphanumeric between 6 and 30 characters.'
    default:
      return `The ${failedInput} is not valid or not allowed.`
  }
}

const validateData = (schema, check = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[check])
  error
    ? Response.error(res, generateErrorMessage(error.details[0].path[0]), 400, error)
    : next()
}

module.exports = validateData
