const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)

describe('Transactions endpoint /transactions', () => {
  const BEARER = { type: 'bearer' }
  let TOKEN
  let testTransactionId

  beforeAll(async () => {
    const loginResponse = await request.post('/users/login').send({
      email: 'testemail@test.com',
      password: 'testpassword'
    })
    TOKEN = loginResponse.body.data.token
  })

  describe('Bad request errors', () => {
    it('It has to fail asking for token.', async (done) => {
      const response = await request.get('/transactions')
      expect(response.status).toBe(400)
      expect(response.body.data).toBe('Token not found!')
      done()
    })

    it('Should complains about the amount', async (done) => {
      const response = await request
        .post('/transactions')
        .auth(TOKEN, BEARER)
        .send({ concept: 'Test', amount: 'testAmount' })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The amount cannot be negative or greater than 8 digits.')
      done()
    })

    it('Should not let update a transaction of another user', async (done) => {
      const response = await request
        .put('/transactions/5')
        .auth(TOKEN, BEARER)
        .send({
          amount: 500.50
        })

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The transaction could not be updated!')
      done()
    })

    it('Should not let delete a transaction of another user', async (done) => {
      const response = await request
        .delete('/transactions/5')
        .auth(TOKEN, BEARER)

      expect(response.status).toBe(400)
      expect(response.body.data).toBe('The transaction could not be deleted!')
      done()
    })
  })

  it('Should create a new transaction and return it', async (done) => {
    const response = await request
      .post('/transactions')
      .auth(TOKEN, BEARER)
      .send({
        concept: 'TestTransaction',
        amount: 2000.30,
        type: 'EGRESS',
        category: 'BILLS'
      })

    testTransactionId = response.body.data.createdTransaction.id
    expect(response.status).toBe(201)
    expect(Object.keys(response.body.data.createdTransaction)).toStrictEqual(
      ['id', 'concept', 'amount', 'type', 'category', 'userId', 'date']
    )
    done()
  })

  it('Should get last 10 transactions in order', async (done) => {
    const response = await request
      .get('/transactions?limit=10')
      .auth(TOKEN, BEARER)

    expect(response.status).toBe(200)
    expect(response.body.data.transactionsList[0].id).toBe(testTransactionId)
    expect(response.body.data.transactionsList.length).toBeLessThanOrEqual(10)
    done()
  })

  it('Should get only egress transactions', async (done) => {
    const response = await request
      .get('/transactions?type=EGRESS')
      .auth(TOKEN, BEARER)

    const onlyEgressType = response.body.data.transactionsList
      .filter(transaction => transaction.type === 'EGRESS')

    expect(response.status).toBe(200)
    expect(onlyEgressType.length).toBe(response.body.data.transactionsList.length)
    done()
  })

  it('Should update a transaction', async (done) => {
    const response = await request
      .put(`/transactions/${testTransactionId}`)
      .auth(TOKEN, BEARER)
      .send({
        amount: 500.50
      })

    expect(response.status).toBe(200)
    expect(response.body.data.updatedTransaction.amount).toBe('500.50')
    done()
  })

  it('Should delete a transaction', async (done) => {
    const response = await request
      .delete(`/transactions/${testTransactionId}`)
      .auth(TOKEN, BEARER)

    expect(response.status).toBe(200)
    expect(response.body.data.deletedTransaction)
      .toMatch(`${testTransactionId}`)
    done()
  })
})
