const mysql = require('./config/db-con');

async function fetchEmployees() {
  try {
    let workouts = await mysql.pool.query(
      'SELECT * FROM employee'
      );
    
    workouts = JSON.parse(JSON.stringify(workouts));
    return workouts;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  fetchEmployees,
};
