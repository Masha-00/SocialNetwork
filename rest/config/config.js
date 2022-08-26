const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'users';
const MONGO_DB = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const JWT_TOKEN = process.env.JWT_TOKEN || 'randomString';
const EXPIRESIN = { expiresIn: 3600 };
module.exports = {
  PORT, MONGO_DB, JWT_TOKEN, EXPIRESIN,
};
