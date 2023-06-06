const { Roles } = require('#src/db/models')
const { validationResult } = require('express-validator')
const { response } = require('#src/helpers/utils')

module.exports = {
  createRole: async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return response(res, 'error validation', { errors: errors.array() }, false, 400)
      }

      const roles = await Roles.create(req.body)
      return response(res, 'Role created', { data: roles.dataValues }, true, 201)
    } catch (error) {
      next(error)
    }
  }
}
