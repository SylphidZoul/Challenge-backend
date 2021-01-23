const TransactionStore = require('../store/transactions')

class TransactionsService {
  constructor () {
    this.store = new TransactionStore()
  }

  async getActualBalance (userId) {
    const transactions = await this.store.find(['amount', 'type'], { userId })

    const actualBalance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount)
      if (transaction.type === 'EGRESS') return acc - amount
      return acc + amount
    }, 0)

    return actualBalance.toFixed(2)
  }

  async getTransactions (user, query) {
    const { limit, page, ...filters } = query
    const where = { ...filters, userId: user.id }

    const transactionsList = await this.store.find(null, where, [['date', 'desc'], ['id', 'desc']], limit, page)

    const actualBalance = await this.getActualBalance(user.id)

    return { transactionsList, actualBalance }
  }

  async createTransaction (user, body) {
    const newTransaction = {
      ...body,
      userId: user.id,
      date: body.date || Date.now()
    }

    const createdTransaction = await this.store.create(newTransaction)

    return { createdTransaction }
  }

  async updateTransaction (user, idObject, body) {
    const where = { userId: user.id, ...idObject }
    const wasUpdated = await this.store.update(where, body)
    if (!wasUpdated) throw new Error('The transaction could not be updated!')

    const updatedTransaction = await this.store.find(null, idObject)

    return { updatedTransaction: updatedTransaction[0] }
  }

  async deleteTransaction (user, idObject) {
    const where = { userId: user.id, ...idObject }
    const wasDeleted = await this.store.delete(where)
    if (!wasDeleted) throw new Error('The transaction could not be deleted!')

    return { deletedTransaction: idObject.id }
  }
}

module.exports = TransactionsService
