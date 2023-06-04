const roles = require('@src/controllers/roles')
const route = require('express').Router()
const validate = require('./validation')

route.post('/roles', validate.createRole, roles.createRole)

module.exports = route
