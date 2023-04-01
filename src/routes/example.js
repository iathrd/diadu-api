const example = require('../controllers/example')
const route = require('express').Router()

route.get('/example', example.example)

module.exports = route
