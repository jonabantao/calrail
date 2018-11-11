const mysql = require('../config/db-con');

async function findAll() {
  try {
    let certifications = await mysql.pool.query(
      'SELECT id, title ' +
      'FROM certification'
    );

    return certifications;
  } catch (e) {
    throw e;
  }
}

async function addOne(certInfo) {
  try {
    await mysql.pool.query(
      'INSERT INTO certification (title) ' +
      'VALUES (?)',
      [certInfo.title]
    );
  } catch (e) {
    throw e;
  }
}

async function deleteOne(certID) {
  const certIDCheck = Number.parseInt(certID, 10);

  try {
    if (certIDCheck === 1 || certIDCheck === 2) {
      throw {
        code: 'ER_CONDUCTOR_ENGINEER_DELETE_NOT_ALLOWED',
        error: new Error('Delete not allowed'),
      }
    }

    await mysql.pool.query(
      'DELETE FROM certification WHERE id = ?',
      certID,
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
