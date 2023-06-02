const { Users } = require('@src/db/models')
const { response } = require('@src/helpers/utils')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return response(res, 'error validation', { errors: errors.array() }, false, 400)
      }

      const hashedPassword = await argon2.hash(req.body.password)
      const createUser = await Users.create({ ...req.body, id: uuidv4(), password: hashedPassword })
      response(res, 'User created', { data: createUser.dataValues }, true, 201)
    } catch (error) {
      next(error)
    }
  },
  signin: async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return response(res, 'error validation', { errors: errors.array() }, false, 400)
      }

      const { SECRET_KEY } = process.env

      const token = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '1h' })

      response(res, 'Login succesfuly', { data: { jwt_token: token } }, true, 200)
    } catch (error) {
      next(error)
    }
  }
}
