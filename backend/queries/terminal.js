const mysql = require('../config/db-con');

async function findAll() {
  try {
    let terminals = await mysql.pool.query(
      'SELECT id, name FROM terminal'
    );

    return terminals;
  } catch (e) {
    throw new Error(e);
  }
}


async function addOne(terminalInfo) {
  const { terminalName } = terminalInfo;

  try {
    await mysql.pool.query(
      'INSERT INTO terminal (name) ' +
      'VALUES (?)',
      [terminalName]
    );
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteOne(terminalID) {
  try {
    await mysql.pool.query(
      'DELETE FROM terminal WHERE id = ?',
      terminalID,
    );
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findAll,
  addOne,
  deleteOne,
};
