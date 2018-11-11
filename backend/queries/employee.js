const mysql = require('../config/db-con');

async function findAll() {
  try {
    let employees = await mysql.pool.query(
      'SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date ' +
      'FROM employee e ' +
      'INNER JOIN terminal h ON h.id = e.home_base_id'
    );

    return employees;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function findAllEngineers() {
  try {
    let engineers = await mysql.pool.query(
      'SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date, c.title ' +
      'FROM employee e ' +
      'INNER JOIN terminal h ON h.id = e.home_base_id ' +
      'INNER JOIN employee_certification ec ON ec.employee_id = e.id ' +
      'INNER JOIN certification c ON c.id = ec.certification_id ' +
      'WHERE c.title = "Engineer"'
    );

    return engineers;
  } catch (e) {
    throw e;
  }
}

async function findAllConductors() {
  try {
    let conductors = await mysql.pool.query(
      'SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date, c.title ' +
      'FROM employee e ' +
      'INNER JOIN terminal h ON h.id = e.home_base_id ' +
      'INNER JOIN employee_certification ec ON ec.employee_id = e.id ' +
      'INNER JOIN certification c ON c.id = ec.certification_id ' +
      'WHERE c.title = "Conductor"'
    );

    return conductors;
  } catch (e) {
    throw e;
  }
}

async function findAllWithCertifications() {
  try {
    let employeesWithCertifications = await mysql.pool.query(
      'SELECT e.id employee_id, CONCAT(e.fname, " ", e.lname) full_name, ' +
      'c.id certification_id, c.title, ec.certification_date ' +
      'FROM employee e ' +
      'INNER JOIN employee_certification ec ON ec.employee_id = e.id ' +
      'INNER JOIN certification c ON c.id = ec.certification_id'
    );

    return employeesWithCertifications;
  } catch (e) {
    throw e;
  }
}

async function addOne(empInfo) {
  const { fName, lName, homeID, startDate } = empInfo;

  try {
    await mysql.pool.query(
      'INSERT INTO employee (fname, lname, home_base_id, start_date) ' + 
      'VALUES (?, ?, ?, ?)',
      [fName, lName, homeID, startDate]
    );
  } catch (e) {
    throw e;
  }
}

async function addCertification(empCertInfo) {
  const { employeeID, certificationID, certificationDate } = empCertInfo;

  try {
    await mysql.pool.query(
      'INSERT INTO employee_certification (employee_id, certification_id, certification_date) ' +
      'VALUES (?, ?, ?)',
      [employeeID, certificationID, certificationDate]
    );
  } catch (e) {
    throw e;
  }
}

async function deleteOne(empId) {
  try {
    await mysql.pool.query(
      'DELETE FROM employee WHERE id = ?',
      empId
    );
  } catch (e) {
    throw e;
  }
}

async function deleteCertification(empID, certID) {
  try {
    await mysql.pool.query(
      'DELETE FROM employee_certification WHERE employee_id = ? AND certification_id = ?',
      [empID, certID],
    );
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findAll,
  findAllWithCertifications,
  findAllEngineers,
  findAllConductors,
  addOne,
  addCertification,
  deleteOne,
  deleteCertification,
};
