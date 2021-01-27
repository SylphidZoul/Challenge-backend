const Sentry = require('@sentry/node')
const { SENTRY: { DSN } } = require('../config')

Sentry.init({ dsn: DSN })

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
    if (err) Sentry.captureException(err)

    res.status(statusCode).send({
      error: true,
      status,
      data: statusMessage
    })
  }
}

module.exports = Response
