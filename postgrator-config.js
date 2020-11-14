require("dotenv").config();

module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASEB_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
};
