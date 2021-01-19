const Sequelize = require('sequelize')
const { MYSQL } = require('../config')

const MySQLService = new Sequelize(MYSQL.DATABASE, MYSQL.USER, MYSQL.PASSWORD, {
  host: MYSQL.HOST,
  port: MYSQL.PORT,
  dialect: 'mysql',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  logging: false
})

module.exports = MySQLService
