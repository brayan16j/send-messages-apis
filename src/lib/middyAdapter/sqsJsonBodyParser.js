class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
    this.expose = true
    this.type = 'urn:problem:invalid-request'
    this.title = 'Bad Request'
  }
}

const sqsJsonBodyParser = () => {
  const sqsJsonBodyParserBefore = async (req) => {
    if (!req.event.Records || !Array.isArray(req.event.Records)) {
      throw new BadRequestError('Invalid or malformed Event was provided')
    }

    try {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      req.event.Records.forEach((element) => {
        element.rawBody = element.body
        element.body = JSON.parse(element.body)
      })
    } catch (error) {
      console.log({ error, req })
      throw new BadRequestError('Invalid or malformed JSON was provided')
    }
  }

  return {
    before: sqsJsonBodyParserBefore
  }
}

module.exports = sqsJsonBodyParser
