'use-strict';

const {
  PORT,
  NODE_ENV,
  CORS_ALLOWED_ORIGINS,
  MONGODB_URL,
  MONGODB_PORT,
  MONGODB_DATABASE_NAME,
  HIPSUM_API_URL,
} = process.env;

const config = {
  port: PORT || 3030,
  enviroment: NODE_ENV || 'development',
  corsAllowedOrigins: CORS_ALLOWED_ORIGINS || 'http://localhost:3000',
  mongodbUrl: MONGODB_URL,
  mongodbPort: MONGODB_PORT,
  mongodbDatabaseName: MONGODB_DATABASE_NAME,
  hipsumAPI: HIPSUM_API_URL,
};

module.exports = config;
