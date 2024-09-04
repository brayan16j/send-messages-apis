const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const configClient = require("@/lib/utils/configClient");

const client = new SNSClient(configClient);

const sendSmsCommand = async (
  phoneNumber = "",
  message = ""
) => {
  const params = {
    PhoneNumber: phoneNumber,
    Message: message,
    // Opcional: Puedes especificar atributos adicionales aquí, como MessageType
  };

  try {
    const command = new PublishCommand(params);
    const response = await client.send(command);
    console.log("SMS sent successfully:", response);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

module.exports = { sendSmsCommand };