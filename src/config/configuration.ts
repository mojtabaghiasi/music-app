export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV,
});
