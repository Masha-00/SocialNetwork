const ajvInstance = require('./ajv-instance');

const newUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string', pattern: '^\\w+$', minLength: 2, maxLength: 14,
    },
    email: { type: 'string', pattern: '^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$' },
    password: {
      type: 'string', pattern: '^[^\\s]+$', minLength: 6, maxLength: 14,
    },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const updateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string', pattern: '^\\w{3,24}',
    },
    email: { type: 'string', pattern: '^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$' },
  },
  additionalProperties: false,
};

const newUser = ajvInstance.compile(newUserSchema);
const updateUserSchema = ajvInstance.compile(updateSchema);

module.exports = { newUser, updateUserSchema };
