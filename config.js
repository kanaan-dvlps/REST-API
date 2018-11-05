module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://127.0.0.1: 3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://rest_api:compl3x!ty@ds249123.mlab.com:49123/rest_api',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}