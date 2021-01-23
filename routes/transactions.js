const express = require('express')
const TransactionsService = require('../services/transactions')
const Response = require('../utils/response')
const verifyToken = require('../middleware/auth')
const validateData = require('../middleware/validateData')
const { getQuery, idParam, createBody, updateBody } = require('../utils/schema/transactions')

const router = express.Router()
const transactionsService = new TransactionsService()

router.get('/', verifyToken, validateData(getQuery, 'query'), async (req, res) => {
  try {
    const data = await transactionsService.getTransactions(req.user, req.query)
    Response.success(res, data, 200)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

router.post('/', verifyToken, validateData(createBody), async (req, res) => {
  try {
    const data = await transactionsService.createTransaction(req.user, req.body)
    Response.success(res, data, 201)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

router.put('/:id', verifyToken, validateData(idParam, 'params'), validateData(updateBody), async (req, res) => {
  try {
    const data = await transactionsService.updateTransaction(req.user, req.params, req.body)
    Response.success(res, data, 200)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

router.delete('/:id', verifyToken, validateData(idParam, 'params'), async (req, res) => {
  try {
    const data = await transactionsService.deleteTransaction(req.user, req.params)
    Response.success(res, data, 200)
  } catch (err) {
    Response.error(res, err.message, 400, err)
  }
})

module.exports = router
