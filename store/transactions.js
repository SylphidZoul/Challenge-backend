const transactionModel = require('../models/transactions')

class TransactionStore {
  constructor () {
    this.table = transactionModel
  }

  async find (attributes, where, order, limitBy, page) {
    const limit = limitBy ? parseInt(limitBy) : null
    const offset = (limit && page) ? limit * (parseInt(page) - 1) : 0
    const transactions = await this.table.findAll({
      attributes,
      offset,
      limit,
      where,
      order,
      raw: true
    })

    return transactions
  }

  async create (newTransaction) {
    const createdTransaction = await this.table.create(newTransaction)
    return createdTransaction
  }

  async update (where, updates) {
    const updatedTransaction = await this.table.update(updates, { where })
    return updatedTransaction[0]
  }

  async delete (where) {
    const deletedTransaction = await this.table.destroy({ where })
    return deletedTransaction
  }
}

module.exports = TransactionStore
