const errorHandler = () => {
  const onError = async (req) => {
    if (req.response !== undefined || !req.error) return

    if (!req.error.statusCode || !req.error.expose) {
      req.error = {
        type: 'urn:problem:server-error',
        title: 'Server Error',
        message: 'An unexpected error has occurred, contact the administrator.',
        statusCode: 500
      }
    }

    const { statusCode, type, title, name } = req.error
    let { message } = req.error

    if (statusCode === 400 && req.error.cause) message = req.error.cause[0].message

    let instance = null
    if (req.event.requestContext !== undefined) instance = req.event.requestContext.path

    req.response = {
      statusCode,
      body: JSON.stringify({
        type: type ?? 'about:blank',
        title: title ?? name,
        detail: message,
        instance,
        status: statusCode
      }),
      headers: {
        'Content-Type': 'application/problem+json'
      }
    }
  }

  return {
    onError
  }
}

module.exports = errorHandler
