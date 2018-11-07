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

async function findAllEngineers() {
  try {
    let engineers = await mysql.pool.query(
      `SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date, c.title
      FROM employee e
      INNER JOIN terminal h ON h.id = e.home_base_id
      INNER JOIN employee_certification ec ON ec.employee_id = e.id
      INNER JOIN certification c ON c.id = ec.certification_id
      WHERE c.title = 'Engineer'`
    );

    return engineers;
  } catch (e) {
    throw new Error(e);
  }
}

async function findAllConductors() {
  try {
    let conductors = await mysql.pool.query(
      `SELECT e.id, e.fname, e.lname, h.name homebase, e.start_date, c.title
      FROM employee e
      INNER JOIN terminal h ON h.id = e.home_base_id
      INNER JOIN employee_certification ec ON ec.employee_id = e.id
      INNER JOIN certification c ON c.id = ec.certification_id
      WHERE c.title = 'Conductor'`
    );

    return conductors;
  } catch (e) {
    throw new Error(e);
  }
}

async function findAllWithCertifications() {
  try {
    let employeesWithCertifications = await mysql.pool.query(
      `SELECT e.id employee_id, CONCAT(e.fname, ' ', e.lname) full_name, c.id certification_id, c.title, ec.certification_date
      FROM employee e
      INNER JOIN employee_certification ec ON ec.employee_id = e.id
      INNER JOIN certification c ON c.id = ec.certification_id`
    );

    return employeesWithCertifications;
  } catch (e) {
    throw new Error(e);
  }
}

async function addOne(empInfo) {
  const { employeeFName, employeeLName, employeeHomeId, employeeStartDate } = empInfo;

  try {
    await mysql.pool.query(
      `INSERT INTO employee (fname, lname, home_base_id, start_date)
      VALUES (?, ?, ?, ?)`,
      [employeeFName, employeeLName, employeeHomeId, employeeStartDate]
    );
  } catch (e) {
    throw new Error(e);
  }
}

async function addCertification(empCertInfo) {
  const { employeeId, certificationId, certificationDate } = empCertInfo;

  try {
    await mysql.pool.query(
      `INSERT INTO employee_certification (employee_id, certification_id, certification_date)
      VALUES (?, ?, ?)`,
      [employeeId, certificationId, certificationDate]
    );
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteOne(empId) {
  try {
    await mysql.pool.query(
      `DELETE FROM employee
      WHERE id = ?`,
      empId
    );
  } catch (e) {
    throw new Error(e);
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
};
