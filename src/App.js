const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { database } = require('./helpers/db')
const cors = require('cors')

const app = express()
const server = require('http').createServer(app)
require('dotenv').config()
app.use(cors())

const { SERVER_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// define api route
const appRoute = require('./routes')

// defie api
app.use('/api', appRoute.user)
app.use('/api', appRoute.roles)

server.listen(SERVER_PORT, () => {
  console.log(`App listen on port ${SERVER_PORT}`)
  database()
})

// Error handler http request
app.use(async (req, res, next) => {
  next(new Error('Not Found'))
})

// custom error
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    succes: false,
    status: err.status || 500,
    message: err.message
  })
})

module.exports = app
