const express = require('express')
const cors = require('cors')
const handleParserError = require('./middleware/handleParserError')
const usersRouter = require('./routes/users')
const transactionsRouter = require('./routes/transactions')
const { CORS } = require('./config')

const app = express()

app.use(cors(CORS))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(handleParserError)

app.use('/users', usersRouter)
app.use('/transactions', transactionsRouter)

module.exports = app
