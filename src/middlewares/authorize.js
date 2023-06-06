const { response } = require('#src/helpers/utils')
const jwt = require('jsonwebtoken')

module.exports = (expectedRole) => (req, res, next) => {
  if (!req.headers.authorization) { return response(res, 'Unauthorized', {}, false, 401) }
  const bearerToken = req.headers.authorization.split(' ')[1]
  jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
      return response(res, message, {}, false, 401)
    }
    if (expectedRole.includes(decode.role)) {
      req.payload = decode
      next()
    } else {
      return response(res, 'Access denied', {}, false, 401)
    }
  })
}
