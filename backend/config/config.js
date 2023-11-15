require('dotenv').config();

const JWT_SECRET = (process.env.NODE_ENV === 'production')
  ? process.env.JWT_SECRET
  : 'super-strong-secret';

module.exports = { JWT_SECRET };
