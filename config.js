'use-strict';

const {
  PORT,
  NODE_ENV,
  CORS_ALLOWED_ORIGINS
} = process.env;

const config = {
  port: PORT || 3030,
  enviroment: NODE_ENV || 'development',
  corsAllowedOrigins: CORS_ALLOWED_ORIGINS || 'http://localhost:3000'
};

module.exports = config;
