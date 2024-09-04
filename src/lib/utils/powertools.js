const { Logger } = require('@aws-lambda-powertools/logger')
const { Metrics } = require('@aws-lambda-powertools/metrics')

const logger = new Logger()
const metrics = new Metrics()
module.exports = { logger, metrics }
