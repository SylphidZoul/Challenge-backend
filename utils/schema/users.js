const Joi = require('joi')

const basicBody = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required()
}

const logInBody = Joi.object(basicBody)

const signUpBody = Joi.object({
  ...basicBody,
  username: Joi.string().pattern(/^[a-zA-Z0-9]{5,40}$/).required()
})

module.exports = {
  logInBody,
  signUpBody
}
