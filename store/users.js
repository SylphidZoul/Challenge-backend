const userModel = require('../models/users')

class UserStore {
  constructor () {
    this.table = userModel
  }

  async findOne (where) {
    const user = await this.table.findOne({ where, raw: true })
    return user
  }

  async create (newUser) {
    const createdUser = await this.table.create(newUser)
    const { password, ...user } = createdUser.get({ plain: true })
    return user
  }
}

module.exports = UserStore
