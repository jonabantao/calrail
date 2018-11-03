const mysql = require('../config/db-con');

async function findAll() {
  try {
    let trains = await mysql.pool.query(
      `SELECT id, name, make, model FROM train`
    );

    return trains;
  } catch (e) {
    throw new Error(e);
  }
}


async function addOne(trainInfo) {
  const { trainId, trainName, trainMake, trainModel } = trainInfo;

  try {
    await mysql.pool.query(
      `INSERT INTO train (id, name, make, model)
      VALUES (?, ?, ?, ?)`,
      [trainId, trainName, trainMake, trainModel]
    );
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  findAll,
  addOne,
};
