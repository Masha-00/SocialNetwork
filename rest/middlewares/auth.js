const jwt = require('jsonwebtoken');
const JWT_TOKEN = require('../config/config');
const CustomError = require('../errors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_TOKEN.JWT_TOKEN, (err, id) => {
      if (err) {
        throw new CustomError().unauthorized('Authentication error');
      }
    });
    const { user: { id } } = jwt.decode(token);
    req.user = { id };
    next();
  } catch (error) {
    throw new CustomError().unauthorized('Authentication error');
  }
};
