const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpEventNormalizer = require('@middy/http-event-normalizer')
const { injectLambdaContext } = require('@aws-lambda-powertools/logger')
const { logMetrics } = require('@aws-lambda-powertools/metrics')

const { logger, metrics } = require('../utils/powertools')
const validatorMiddleware = require('./validatorMiddleware')
const errorHandlerMiddleware = require('./errorHandlerMiddleware')
const sqsJsonBodyParser = require('./sqsJsonBodyParser')

const adapter = (handler, eventSchema = {}, contextSchema = {}) =>
  middy(handler)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(validatorMiddleware({ eventSchema, contextSchema }))
    .use(errorHandlerMiddleware())
    .use(injectLambdaContext(logger, { logEvent: false }))
    .use(logMetrics(metrics))

const adapterEvent = (handler, eventSchema = {}, contextSchema = {}) =>
  middy(handler)
    .use(sqsJsonBodyParser())
    .use(validatorMiddleware({ eventSchema, contextSchema }))
    .use(errorHandlerMiddleware())
    .use(injectLambdaContext(logger, { logEvent: false }))
    .use(logMetrics(metrics))

const adapterDynamoEvent = (handler, eventSchema = {}, contextSchema = {}) =>
  middy(handler)
    .use(validatorMiddleware({ eventSchema, contextSchema }))
    .use(errorHandlerMiddleware())
    .use(injectLambdaContext(logger, { logEvent: false }))
    .use(logMetrics(metrics))

module.exports = { adapter, adapterEvent, adapterDynamoEvent }
