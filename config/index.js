module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  MONGODB_URL: 'mongodb://localhost:27017/mestodb',
};
