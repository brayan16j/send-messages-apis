const { MetricUnits } = require("@aws-lambda-powertools/metrics");
const { logger, metrics } = require("@/lib/utils/powertools");
const middyAdapter = require("@/lib/middyAdapter");
const httpResponse = require("@/lib/utils/httpResponse");
const { sendEmailCommand } = require("@/services/sendEmailCommand");
const { sendEmailSesSchema } = require("@/lib/schemas/sendEmailSesSchema");

const sendEmail = async (event) => {
    console.log('EVENT ---> ', event.body);
  const {
    source,
    toAddress,
    ccAddress,
    bccAddress,
    dataSubject,
    bodyText,
    bodyHtml,
    replyToaddress,
    returnPath,
    sourceArn,
    returnPathArn,
    configSetname,
  } = event.body;

  try {
    await sendEmailCommand(
      source,
      toAddress,
      ccAddress,
      bccAddress,
      dataSubject,
      bodyText,
      bodyHtml,
      replyToaddress,
      returnPath,
      sourceArn,
      returnPathArn,
      configSetname
    );

    logger.info("Email sent successfully");
    metrics.addMetric("SendEmailSuccess", MetricUnits.Count, 1);
    return httpResponse.ok("Email sent successfully");
  } catch (error) {
    logger.error(error);
    metrics.addMetric("SendEmailError", MetricUnits.Count, 1);
    return httpResponse.error({ error: error });
  }
};

exports.handler = middyAdapter.adapter(sendEmail, sendEmailSesSchema);
