const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
)

const scopes = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/userinfo.email ',
  'https://www.googleapis.com/auth/gmail.send'
]

const generateAuthUrlGmail = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  })
}

const authenticateAndStoreToken = async (authCode) => {
  const { tokens } = await oauth2Client.getToken(authCode)
  oauth2Client.setCredentials(tokens)

  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
  const userInfo = await oauth2.userinfo.get()
  const userId = userInfo.data.email

  return tokens
}

const listEmails = async (userId) => {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })
    const response = await gmail.users.messages.list({ userId: userId, maxResults: 100 })
    const messageList = response.data.messages

    // detalles de cada correo
    const detailedMessagesPromises = messageList.map(async (message) => {
      const messageData = await gmail.users.messages.get({ userId: userId, id: message.id })
      const id = messageData.data.id
      const headers = messageData.data.payload.headers
      const subjectHeader = headers.find((header) => header.name === 'Subject')
      const fromHeader = headers.find((header) => header.name === 'From')
      const toHeader = headers.find((header) => header.name === 'To')
      const subject = subjectHeader ? subjectHeader.value : 'No Subject'
      const from = fromHeader ? fromHeader.value : 'No From'
      const to = toHeader ? toHeader.value : 'No To'
      const isRead = !messageData.data.labelIds.includes('UNREAD')

      return {
        id,
        subject,
        from,
        to,
        isRead
      }
    })

    const detailedMessages = await Promise.all(detailedMessagesPromises)

    return detailedMessages
  } catch (err) {
    throw new Error(`Error list emails: ${err.message}`)
  }
}

module.exports = {
  generateAuthUrlGmail,
  listEmails,
  authenticateAndStoreToken
}
