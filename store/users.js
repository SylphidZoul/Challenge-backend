const userModel = require('../models/users')

class UserStore {
  constructor () {
    this.table = userModel
  }

  async findOne (where) {
    try {
      const { dataValues: user } = await this.table.findOne({ where })
      return user
    } catch (error) {
      return null
    }
  }

  async create (newUser) {
    const {
      dataValues: {
        password,
        ...createdUser
      }
    } = await this.table.create(newUser)
    return createdUser
  }
}

module.exports = UserStore
