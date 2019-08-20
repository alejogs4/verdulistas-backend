const { Pool } = require('pg');

let database = null;

module.exports = function getDatabaseInstance() {
  if (!database) {
    database = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
    });
  }

  return database;
};
