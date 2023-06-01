const { Sequelize } = require('sequelize')
require('dotenv').config()
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'

})

const database = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('\x1b[31m', 'Unable to connect to the database !!')
  }
}

module.exports = { database }
