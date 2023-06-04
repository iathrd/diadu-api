module.exports = {
  response: (res, message, aditionalData, success = true, status = 200) => {
    res.status(status).send({
      code: status,
      success,
      message: message || 'Success',
      ...aditionalData
    })
  }
}
