const { google } = require("googleapis");
const { logger } = require("@/lib/utils/powertools");
const httpResponse = require("@/lib/utils/httpResponse");

const handler = async (event) => {
  try {
    const { TOKEN, source, toAddress, dataSubject, bodyText } = JSON.parse(
      event.body
    );

    if (!TOKEN || !source || !toAddress || !dataSubject || !bodyText) {
      throw new Error("Missing required fields");
    }

    const accessToken = TOKEN.access_token;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const email =
      `From: ${source}\r\n` +
      `To: ${toAddress.join(", ")}\r\n` +
      `Subject: ${dataSubject}\r\n\r\n` +
      `${bodyText}`;

    const base64EncodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64EncodedEmail,
      },
    });

    return httpResponse.ok({ message: "Email sent successfully", response });
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    return httpResponse.badRequest({ message: "Failed to send email", error });
  }
};

module.exports = { handler };
