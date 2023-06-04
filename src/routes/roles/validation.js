const { checkSchema } = require('express-validator')

module.exports = {
  createRole: checkSchema({
    name: {
      exists: {
        errorMessage: 'Name is required'
      },
      isString: {
        errorMessage: 'Name should bestring'
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Name should be at least 5 characters'
      }
    },
    description: {
      exists: {
        errorMessage: 'Description is required'
      },
      isString: {
        errorMessage: 'Description should bestring'
      },
      isLength: {
        options: { min: 5 },
        errorMessage: 'Description should be at least 5 characters'
      }
    }
  })
}
