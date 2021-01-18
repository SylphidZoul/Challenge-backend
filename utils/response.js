class Response {
  static success (res, data, status) {
    const statusCode = status || 200

    res.status(statusCode).send({
      error: false,
      status,
      data
    })
  }

  static error (res, message, status, err) {
    const statusCode = status || 500
    const statusMessage = message || 'Internal server error'
    if (err) console.error(err)

    res.status(statusCode).send({
      error: true,
      status,
      data: statusMessage
    })
  }
}

module.exports = Response
