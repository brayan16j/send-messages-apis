const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const addCustomErrors = require('ajv-errors')
const addKeywords = require('ajv-keywords')

const ajv = new Ajv({ allErrors: true, removeAdditional: true })
addFormats(ajv)
addCustomErrors(ajv)
addKeywords(ajv, 'transform')

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
    this.expose = true
    this.type = 'urn:problem:invalid-request'
    this.title = 'Bad Request'
  }
}

const validatorMiddleware = ({ eventSchema, contextSchema }) => {
  const beforeValidator = async (req) => {
    if (eventSchema) {
      const validateEvent = ajv.compile(eventSchema)
      const isValid = validateEvent(req.event)

      if (!isValid) throw new BadRequestError(validateEvent.errors[0].message)
    }

    if (contextSchema) {
      const validateContext = ajv.compile(contextSchema)
      const isValid = validateContext(req.context)

      if (!isValid) throw new BadRequestError(validateContext.errors[0].message)
    }
  }

  return {
    before: beforeValidator
  }
}

module.exports = validatorMiddleware
