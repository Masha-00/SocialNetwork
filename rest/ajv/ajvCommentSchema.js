const ajvInstance = require('./ajv-instance');

const commentSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    body: { type: 'string', minLength: 1, maxLength: 500 },
  },
  required: ['body'],
  additionalProperties: false,
};

const comment = ajvInstance.compile(commentSchema);

module.exports = { comment };
