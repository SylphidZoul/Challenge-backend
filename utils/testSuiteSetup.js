const MySQLService = require('../store/mysql')

beforeAll(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => null)
})

afterAll((done) => {
  MySQLService.close()
  done()
})
