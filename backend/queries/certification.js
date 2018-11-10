const mysql = require('../config/db-con');

async function findAll() {
  try {
    let certifications = await mysql.pool.query(
      'SELECT id, title ' +
      'FROM certification'
    );

    return certifications;
  } catch (e) {
    throw new Error(e);
  }
}

async function addOne(certInfo) {
  const { certificationTitle } = certInfo;

  try {
    await mysql.pool.query(
      'INSERT INTO certification (title) ' +
      'VALUES (?)',
      [certificationTitle]
    );
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  findAll,
  addOne,
};
