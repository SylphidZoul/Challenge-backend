const app = require('./app')
const { API } = require('./config')

app.listen(API.PORT, () => {
  console.log('Server listening to port:', API.PORT)
})
