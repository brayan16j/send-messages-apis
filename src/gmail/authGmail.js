const { MetricUnits } = require("@aws-lambda-powertools/metrics");
const { logger, metrics } = require("@/lib/utils/powertools");
//const middyAdapter = require("@/lib/middyAdapter");
const httpResponse = require("@/lib/utils/httpResponse");

const { generateAuthUrlGmail } = require('@/services/gmailAdapter')


const handler = async (event) => {
  try {
      const authUrl = await generateAuthUrlGmail()
      metrics.addMetric('AuthEmail_OK', MetricUnits.Count, 1)
      return httpResponse.ok({ authUrl })
  } catch (err) {
    logger.error(`Error auth email: ${err.message}`)
    metrics.addMetric('AuthEmail_ERROR', MetricUnits.Count, 1)
    return httpResponse.badRequest(err)(event.requestContext.path)
  }
}

module.exports = { handler }
