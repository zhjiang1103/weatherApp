const { Pool } = require('pg');
const db = new Pool({
    connectionString: process.env.DB_URI
  });

  console.log("process.env.DB_URI",process.env.DB_URI)
  module.exports = db;