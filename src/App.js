const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const server = require('http').createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

const exampleRoute = require('./routes/example')

app.use('/api', exampleRoute)

server.listen(3000, () => {
  console.log(`App listen on port ${3000}`)
})

module.exports = app
