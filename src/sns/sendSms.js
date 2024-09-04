const { MetricUnits } = require("@aws-lambda-powertools/metrics");
const { logger, metrics } = require("@/lib/utils/powertools");
const middyAdapter = require("@/lib/middyAdapter");
const httpResponse = require("@/lib/utils/httpResponse");
const {sendSmsCommand} = require("@/services/sendSmsCommand");
const { sendSmsSchema } = require("@/lib/schemas/sendSmsSchema");

const sendSms = async (event) => {
    console.log('EVENT ---> ', event.body);
    const { phoneNumber, message } = event.body;
    try {
        await sendSmsCommand(phoneNumber, message);
        logger.info("SMS sent successfully");
        metrics.addMetric("SendSmsSuccess", MetricUnits.Count, 1);
        return httpResponse.ok("SMS sent successfully");
    } catch (error) {
        logger.error(error);
        metrics.addMetric("SendSmsError", MetricUnits.Count, 1);
        return httpResponse.error({ error: error.message });
    }
};

exports.handler = middyAdapter.adapter(sendSms, sendSmsSchema);