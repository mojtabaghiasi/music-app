export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dbName: process.env.DB_NAME,
});
