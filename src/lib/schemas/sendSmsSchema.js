const sendSmsSchema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        required: ['phoneNumber', 'message'],
        additionalProperties: false,
        properties: {
          phoneNumber: { type: 'string', pattern: '^\\+[1-9]\\d{1,14}$' }, // E.164 format
          message: { type: 'string', minLength: 1, maxLength: 1600 }, // SMS character limits
        }
      }
    }
  };

  export { sendSmsSchema }