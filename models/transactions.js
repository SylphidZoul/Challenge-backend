const Sequelize = require('sequelize')
const MYSQLService = require('../store/mysql')

const transactionModel = MYSQLService.define('transactions', {
  id: {
    type: Sequelize.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  concept: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  type: {
    type: Sequelize.ENUM('INGRESS', 'EGRESS'),
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('FOODS, BILLS, TRANSPORTS, TRANSFERS, OTHERS'),
    allowNull: true
  }
})

transactionModel.sync().then(() => console.log('Transactions table synced!'))

module.exports = transactionModel
