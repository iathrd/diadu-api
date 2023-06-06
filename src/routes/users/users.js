const users = require('@src/controllers/users')
const route = require('express').Router()
const validate = require('./validation')
const authorize = require('../../middlewares/authorize')

route.post('/signup', validate.signup, users.signup)
route.post('/signin', validate.signin, users.signin)
route.get('/user/refresh/:refreshToken', users.refreshToken)
route.get('/user/:id', authorize(['admin']), users.getUser)
route.delete('/user/:id', authorize(['admin']), users.deleteUser)

module.exports = route
