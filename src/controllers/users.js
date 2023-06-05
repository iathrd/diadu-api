const { Users, Roles } = require('@src/db/models')
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
      const createUser = await Users.create({ ...req.body, id: uuidv4(), password: hashedPassword, roleId: 2 })
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
  },
  getUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await Users.findOne({ where: { id }, include: [{ model: Roles, as: 'role' }] })
      if (!user) return response(res, 'User doest exist', {}, false, 401)
      return response(res, 'Detail user', { data: user?.dataValues }, true, 200)
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const deletUser = await Users.destroy({ where: { id } })
      if (!deletUser) return response(res, 'User doest exist', {}, false, 401)
      return response(res, 'Detail user', { data: deletUser?.dataValues }, true, 200)
    } catch (error) {
      next(error)
    }
  }
}
