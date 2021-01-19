const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('Auth endpoint /users', () => {
  describe('Login Service /users/login', () => {
    it('Should return the user data and a token', async (done) => {
      const response = await request.post('/users/login').send({
        email: 'testemail@test.com',
        password: 'testpassword'
      })

      expect(response.status).toBe(200)
      expect(Object.keys(response.body.data.userData)).toStrictEqual(['id', 'username', 'email'])
      expect(typeof response.body.data.token).toBe('string')
      done()
    })

    it('Should return a body validation error', async (done) => {
      const response = await request.post('/users/login').send({
        email: 'testemailtest.com',
        password: 'testpassword'
      })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The email is not valid or not allowed.')
      done()
    })

    it('Should return a incorrect data error', async (done) => {
      const response = await request.post('/users/login').send({
        email: 'testemail@test.com',
        password: 'testpassword11'
      })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('Email or password wrong!')
      done()
    })
  })

  describe('Signup Service /users/signup', () => {
    const randomNumber = Math.ceil(Math.random() * 10000)

    it('Should return the user data and a token', async (done) => {
      const response = await request.post('/users/signup').send({
        username: `testuser${randomNumber}`,
        email: `testemail${randomNumber}@test.com`,
        password: 'testpassword'
      })

      expect(response.status).toBe(201)
      expect(Object.keys(response.body.data.userData)).toStrictEqual(['id', 'username', 'email'])
      expect(typeof response.body.data.token).toBe('string')
      done()
    })

    it('Should return a body validation error', async (done) => {
      const response = await request.post('/users/signup').send({
        email: 'testemailtest.com',
        password: 'testpassword'
      })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The email is not valid or not allowed.')
      done()
    })

    it('Should return a "email in use" error', async (done) => {
      const response = await request.post('/users/signup').send({
        username: `testuser${randomNumber}`,
        email: `testemail${randomNumber}@test.com`,
        password: 'testpassword'
      })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('Email already in use!')
      done()
    })
  })
})
