const users = require('@src/controllers/users')
const route = require('express').Router()
const validate = require('./validation')

route.post('/signup', validate.signup, users.signup)
route.post('/signin', validate.signin, users.signin)
route.get('/user/:id', users.getUser)
route.delete('/user/:id', users.deleteUser)

module.exports = route
