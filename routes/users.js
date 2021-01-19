const express = require('express')
const UsersService = require('../services/users')
const validateData = require('../middleware/validateData')
const { logInBody, signUpBody } = require('../utils/schema/users')
const Response = require('../utils/response')

const router = express.Router()
const usersService = new UsersService()

router.post('/login', validateData(logInBody), async (req, res) => {
  try {
    const data = await usersService.logIn(req.body)
    Response.success(res, data, 200)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

router.post('/signup', validateData(signUpBody), async (req, res) => {
  try {
    const data = await usersService.signUp(req.body)
    Response.success(res, data, 201)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

module.exports = router
