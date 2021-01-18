const express = require('express')
const UsersService = require('../services/users')
const bodyValidation = require('../middleware/bodyValidation')
const { logInBody, signUpBody } = require('../utils/schema/users')
const Response = require('../utils/response')

const router = express.Router()
const usersService = new UsersService()

router.post('/login', bodyValidation(logInBody), (req, res) => {
  usersService.logIn(req.body)
    .then(data => {
      Response.success(res, data, 200)
    })
    .catch(err => {
      Response.error(res, err.message, 400, err)
    })
})

router.post('/signup', bodyValidation(signUpBody), (req, res) => {
  usersService.signUp(req.body)
    .then(data => {
      Response.success(res, data, 201)
    })
    .catch(err => {
      Response.error(res, err.message, 400, err)
    })
})

module.exports = router
