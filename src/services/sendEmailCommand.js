const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const configClient = require("@/lib/utils/configClient");

const client = new SESClient(configClient);

const sendEmailCommand = async (
  source = "",
  toAddress = [],
  ccAddress = [],
  bccAddress = [],
  dataSubject = "",
  bodyText = "",
  bodyHtml = "",
  replyToaddress = [],
  returnPath = null,
  sourceArn = null,
  returnPathArn = null,
  configSetname = null
) => {
  //  [VALIDATIONS: type body Message ]
  let bodyMessage =
    bodyHtml === ""
      ? {
          Text: {
            Data: bodyText,
            Charset: "UTF-8",
          },
        }
      : {
          Html: {
            Data: bodyHtml,
            Charset: "UTF-8",
          },
        };

  const input = {
    Source: source,
    Destination: {
      ToAddresses: toAddress,
      CcAddresses: ccAddress,
      BccAddresses: bccAddress,
    },
    Message: {
      Subject: {
        Data: dataSubject,
        Charset: "UTF-8",
      },
      Body: bodyMessage,
    },
    ReplyToAddresses: replyToaddress,
    ReturnPath: returnPath,
    SourceArn: sourceArn,
    ReturnPathArn: returnPathArn,
    Tags: [
      {
        Name: "messageType",
        Value: "Format",
      },
    ],
    ConfigurationSetName: configSetname,
  };

  return await client.send(new SendEmailCommand(input));
};

module.exports = { sendEmailCommand };
