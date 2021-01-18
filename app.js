const express = require('express')
const { API } = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(API.PORT, () => {
  console.log('Server listening to port:', API.PORT)
})
