const users = require('@src/controllers/users')
const route = require('express').Router()
const validate = require('./validate')

route.post('/signup', validate.signup, users.signup)
route.post('/signin', validate.signin, users.signin)

module.exports = route
