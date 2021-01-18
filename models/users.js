const Sequelize = require('sequelize')
const MYSQLService = require('../store/mysql')

const userModel = MYSQLService.define('users', {
  id: {
    type: Sequelize.SMALLINT.UNSIGNED,
    unsigned: true,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

userModel.sync().then(() => console.log('Users table synced!'))

module.exports = userModel
