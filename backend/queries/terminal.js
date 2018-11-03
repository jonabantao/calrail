const mysql = require('../config/db-con');

async function findAll() {
  try {
    let terminals = await mysql.pool.query(
      `SELECT id, name FROM terminal`
    );

    return terminals;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  findAll,
};
