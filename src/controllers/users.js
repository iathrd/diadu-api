const { Users, Roles } = require('@src/db/models')
const { response } = require('@src/helpers/utils')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async (req, res, next) => {
    try {
      // validate req.body
      const errors = validationResult(req)
      // has error validation
      if (!errors.isEmpty()) {
        return response(res, 'error validation', { errors: errors.array() }, false, 400)
      }
      // hashed password
      const hashedPassword = await argon2.hash(req.body.password)
      // save user data to the database
      const createUser = await Users.create({ ...req.body, id: uuidv4(), password: hashedPassword, roleId: 2 })
      response(res, 'User created', { data: createUser.dataValues }, true, 201)
    } catch (error) {
      next(error)
    }
  },
  signin: async (req, res, next) => {
    try {
      // validate req.body
      const errors = validationResult(req)
      // has error validation
      if (!errors.isEmpty()) {
        return response(res, 'error validation', { errors: errors.array() }, false, 400)
      }
      // jwt secret key
      const { SECRET_KEY, REFRESH_KEY } = process.env
      // generated access token using jwt
      const accessToken = jwt.sign({ username: req.user.username, role: req.user.role.name }, SECRET_KEY, { expiresIn: '1h' })
      // generated refresh token
      const refreshToken = jwt.sign({ username: req.user.username, role: req.user.role.name }, REFRESH_KEY, { expiresIn: '1d' })

      response(res, 'Login succesfuly', { data: { accessToken, refreshToken } }, true, 200)
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { id } = req.params
      // find user with database roles relation
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
      // delete user data
      const deletUser = await Users.destroy({ where: { id } })
      if (!deletUser) return response(res, 'User doest exist', {}, false, 401)
      return response(res, 'Detail user', { data: deletUser?.dataValues }, true, 200)
    } catch (error) {
      next(error)
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.params
      // verify refresh token
      jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decode) => {
        if (err) {
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
          return response(res, message, {}, false, 401)
        }
        // generated new access token
        const accessToken = jwt.sign({ username: decode.username, role: decode.role }, process.env.SECRET_KEY, { expiresIn: '1h' })
        return response(res, 'refresh succesfuly', { data: { accessToken, refreshToken } }, true, 200)
      })
    } catch (error) {
      next(error)
    }
  }
}
