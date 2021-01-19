const express = require('express')
const usersRouter = require('./routes/users')
const transactionsRouter = require('./routes/transactions')
const { API } = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRouter)
app.use('/transactions', transactionsRouter)

app.listen(API.PORT, () => {
  console.log('Server listening to port:', API.PORT)
})
