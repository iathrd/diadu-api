const { checkSchema } = require('express-validator')
const { Users } = require('@src/db/models')

module.exports = {
  signup: checkSchema({
    username: {
      exists: {
        errorMessage: 'Username is required'
      },
      isString: {
        errorMessage: 'Username should bestring'
      },
      isLength: {
        options: { min: 5 },
        errorMessage: 'Username should be at least 5 characters'
      },
      custom: {
        options: async (values) => {
          const findDuplicateUsername = await Users.findOne({ where: { username: values } })
          if (findDuplicateUsername) {
            throw Error
          }
        },
        errorMessage: 'username already exist'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password is required'
      },
      isString: {
        errorMessage: 'Password should bestring'
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password should be at least 8 characters'
      }
    },
    email: {
      exists: {
        errorMessage: 'Email is required'
      },
      isString: {
        errorMessage: 'Email should bestring'
      },
      isEmail: {
        errorMessage: 'Please provide valid email'
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'Email should be at least 8 characters'
      },
      custom: {
        options: async (values) => {
          const findDuplicateUsername = await Users.findOne({ where: { email: values } })
          if (findDuplicateUsername) {
            throw Error
          }
        },
        errorMessage: 'Email already used'
      }
    }
  })
}
