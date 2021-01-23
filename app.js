const express = require('express')
const cors = require('cors')
const usersRouter = require('./routes/users')
const transactionsRouter = require('./routes/transactions')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRouter)
app.use('/transactions', transactionsRouter)

module.exports = app
