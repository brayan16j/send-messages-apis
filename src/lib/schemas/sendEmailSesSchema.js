const sendEmailSesSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['source', 'toAddress', 'dataSubject', 'bodyText'],
      additionalProperties: false,
      properties: {
        connectionId: { type: 'string' },
        source: { type: 'string', format: 'email' },
        toAddress: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        ccAddress: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        bccAddress: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        dataSubject: { type: 'string' },
        bodyText: { type: 'string' },
        bodyHtml: { type: 'string' },
        replyToaddress: {
          type: 'array',
          items: {
            type: 'string',
            format: 'email'
          }
        },
        returnPath: { type: 'string', format: 'email' },
        sourceArn: {
          type: 'string',
          pattern: 'arn:aws:ses:[a-z0-9-]+:[0-9]{12}:identity/[a-zA-Z0-9._-]+'
        },
        returnPathArn: {
          type: 'string',
          pattern: 'arn:aws:ses:[a-z0-9-]+:[0-9]{12}:identity/[a-zA-Z0-9._-]+'
        },
        tagValue: { type: 'string' },
        configSetname: { type: 'string' }
      }
    }
  }
}

export { sendEmailSesSchema }
