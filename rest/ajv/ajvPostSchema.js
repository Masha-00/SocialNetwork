const ajvInstance = require('./ajv-instance');

const postSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 50 },
    body: { type: 'string', minLength: 1, maxLength: 5000 },
  },
  required: ['title', 'body'],
  additionalProperties: false,
};

const post = ajvInstance.compile(postSchema);

module.exports = { post };
