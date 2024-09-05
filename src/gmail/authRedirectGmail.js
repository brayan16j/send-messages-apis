const { authenticateAndStoreToken } = require('@/services/gmailAdapter')
const httpResponse = require("@/lib/utils/httpResponse");
const { logger } = require("@/lib/utils/powertools");

const handler = async (event) => {
  try {
    if (event.queryStringParameters && event.queryStringParameters.code) {
      const response = await authenticateAndStoreToken(event.queryStringParameters.code)
      return httpResponse.ok({ TOKEN: response })
    }
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { handler }
