// Laod env
require("dotenv").config();
// Import knex
const knex = require("knex")({
  // Set client
  client: "cockroachdb",
  // Set connection
  connection: {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port
    database: process.env.DB_NAME, // Database name
    user: process.env.DB_USER, // Database user
    password: process.env.DB_PASSWORD, // Database password
    ssl: true, // Enable SSL
  },
});
// Export knex
module.exports = knex;
