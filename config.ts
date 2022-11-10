import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DBNAME || "database_development",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 8080,
    dialect: "mysql",
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresInSec: parseInt(process.env.JWT_EXPIRES_SEC) || 86400,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
};
