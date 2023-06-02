const { Users } = require('@src/db/models')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

module.exports = {
  signup: async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      const hashedPassword = await argon2.hash(req.body.password)
      const createUser = await Users.create({ ...req.body, id: uuidv4(), password: hashedPassword })
      console.log()
      res.status(200).send({
        status: 200,
        data: createUser.dataValues,
        message: 'User berhasil dibuat',
        isSuccess: true
      })
      res.json({ test: 'sdsa' })
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: 'Internal server error',
        isSuccess: false
      })
      next(error)
    }
  },
  signin: async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      const { SECRET_KEY } = process.env

      const token = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '1h' })

      res.status(200).send({
        status: 200,
        data: { secret_token: token },
        message: 'login succesfuly',
        isSuccess: true
      })
    } catch (error) {
      next(error)
    }
  }
}
