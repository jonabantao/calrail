const mysql = require('mysql');
const util = require('util');
let database;
try {
  database = require('./database-info');
} catch(e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    database = {};
  } else {
    throw new Error(e);
  }
}

let pool = mysql.createPool({
  connectionLimit: 10,
  host: database.host || process.env.DB_HOST,
  user: database.user || process.env.DB_USER,
  password: database.password || process.env.DB_PASSWORD,
  database: database.database || process.env.DB_NAME,
});

// used for async/await
pool.query = util.promisify(pool.query);

module.exports.pool = pool;
