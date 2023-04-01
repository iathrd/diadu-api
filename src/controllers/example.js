
module.exports = {
  example: (req, res) => {
    res.status(200).send({
      success: true,
      data: [{ coba: 'AJAJAJA' }]
    })
  }
}
