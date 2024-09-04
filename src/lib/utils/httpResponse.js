const serverError = (path = '/') => ({
  statusCode: 500,
  body: JSON.stringify({
    type: 'urn:problem:server-error',
    title: 'Server Error',
    detail: 'An unexpected error has occurred, contact the administrator.',
    status: 500,
    instance: path
  }),
  headers: {
    'Content-Type': 'application/problem+json'
  }
})

const media = (data, headers) => ({
  statusCode: 200,
  body: data.toString('base64'),
  isBase64Encoded: true,
  headers: {
    'content-type': headers['content-type']
  }
})

const ok = (good) => ({
  statusCode: 200,
  body: JSON.stringify({
    type: 'urn:success:ok',
    title: 'OK',
    detail: good,
    status: 200
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
const success = (body) => ({
  statusCode: 200,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})

const badRequest =
  (error) =>
  (path = '/') => ({
    statusCode: 400,
    body: JSON.stringify({
      type: 'urn:problem:bad-request',
      title: 'Bad Request',
      detail: error.message,
      status: 400,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const notFound =
  (error) =>
  (path = '/') => ({
    statusCode: 404,
    body: JSON.stringify({
      type: 'urn:problem:not-found',
      title: 'Not Found',
      detail: error.message,
      status: 404,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const conflict =
  (error) =>
  (path = '/') => ({
    statusCode: 409,
    body: JSON.stringify({
      type: 'urn:problem:conflict',
      title: 'Conflict',
      detail: error.message,
      status: 409,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const tooManyRequest =
  (error) =>
  (path = '/') => ({
    statusCode: 429,
    body: JSON.stringify({
      type: 'urn:problem:too-many-requests',
      title: 'Too Many Requests',
      detail: error.message,
      status: 429,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const unauthorized =
  (error) =>
  (path = '/') => ({
    statusCode: 401,
    body: JSON.stringify({
      type: 'urn:problem:unauthorized',
      title: 'Unauthorized',
      detail: error.message,
      status: 401,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const generic =
  (err, code) =>
  (path = '/') => ({
    statusCode: code,
    body: JSON.stringify({
      type: `urn:problem:${err.replace(' ', '-').toLowerCase()}`,
      title: err,
      detail: err,
      status: code,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

const unprocessable =
  (error) =>
  (path = '/') => ({
    statusCode: 422,
    body: JSON.stringify({
      type: 'urn:problem:unprocessable-entity',
      title: 'Unprocessable Entity',
      detail: error.message,
      status: 422,
      instance: path
    }),
    headers: {
      'Content-Type': 'application/problem+json'
    }
  })

module.exports = {
  serverError,
  ok,
  success,
  badRequest,
  generic,
  notFound,
  conflict,
  tooManyRequest,
  unauthorized,
  unprocessable
}
