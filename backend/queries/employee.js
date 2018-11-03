const mysql = require('../config/db-con');

async function findAll() {
  try {
    let employees = await mysql.pool.query(
      `SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date
      FROM employee e
      INNER JOIN terminal h ON h.id = e.home_base_id`
    );

    return employees;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  findAll,
};
