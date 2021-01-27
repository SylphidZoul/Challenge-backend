const UserStore = require('../store/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT: { SECRET } } = require('../config')

class UsersService {
  constructor () {
    this.store = new UserStore()
  }

  async logIn (body) {
    const user = await this.store.findOne({ email: body.email })
    if (!user) throw Error('Email or password wrong!')

    const isPwCorrect = await bcrypt.compare(body.password, user.password)
    if (!isPwCorrect) throw Error('Email or password wrong!')

    const { password, ...userData } = user

    const token = jwt.sign(userData, SECRET, { expiresIn: '30d' })

    return { userData, token }
  }

  async signUp (body) {
    const userExists = await this.store.findOne({ email: body.email })
    if (userExists) throw new Error('Email already in use!')

    const newUser = {
      ...body,
      password: await bcrypt.hash(body.password, 10)
    }

    const createdUser = await this.store.create(newUser)
    const token = jwt.sign(createdUser, SECRET, { expiresIn: '30d' })

    return { userData: createdUser, token }
  }
}

module.exports = UsersService
