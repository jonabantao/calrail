const mysql = require('../config/db-con');

async function findAll() {
  try {
    let trains = await mysql.pool.query(
      'SELECT id, name, make, model FROM train'
    );

    return trains;
  } catch (e) {
    throw new Error(e);
  }
}


async function addOne(trainInfo) {
  console.log(trainInfo)
  const { id, name, make, model } = trainInfo;

  try {
    await mysql.pool.query(
      'INSERT INTO train (id, name, make, model) ' +
      'VALUES (?, ?, ?, ?)',
      [id, name, make, model]
    );
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  findAll,
  addOne,
};
