const mysql = require('../config/db-con');
const constructJobJSON = jobsResult => (
  jobsResult.map((job) => {
    let jsonJob = {};

    jsonJob.id = job.id;
    jsonJob.train_id = job.train_id;

    jsonJob.engineer = {
      id: job.eng_id,
      fname: job.eng_fname,
      lname: job.eng_lname,
    }

    jsonJob.conductor = {
      id: job.con_id,
      fname: job.con_fname,
      lname: job.con_lname,
    }

    jsonJob.assistant_conductor = {
      id: job.ac_id,
      fname: job.ac_fname,
      lname: job.ac_lname,
    }

    jsonJob.start_station = job.start_station;
    jsonJob.start_station_id = job.start_station_id;
    jsonJob.end_station = job.end_station;
    jsonJob.end_station_id = job.end_station_id;
    jsonJob.signup_time = job.signup_time;
    jsonJob.signoff_time = job.signoff_time;

    return jsonJob;
  })
);

async function findAll() {
  try {
    let jobs = await mysql.pool.query(
      'SELECT eng.id eng_id, eng.fname eng_fname, eng.lname eng_lname, ' +
      'con.id con_id, con.fname con_fname, con.lname con_lname, ' +
      'ac.id ac_id, ac.fname ac_fname, ac.lname ac_lname, ' +
      'start.name start_station, end.name end_station, ' +
      'train.id train_id, ' +
      'j.id, j.signup_time, j.signoff_time ' +
      'FROM job j ' +
      'LEFT JOIN employee eng ON eng.id = j.engineer_id ' +
      'LEFT JOIN employee con ON con.id = j.conductor_id ' +
      'LEFT JOIN employee ac ON ac.id = j.assistant_conductor_id ' +
      'INNER JOIN terminal start ON start.id = j.start_station_id ' +
      'INNER JOIN terminal end ON end.id = j.end_station_id ' +
      'LEFT JOIN train ON train.id = j.train_id'
    )

    jobs = constructJobJSON(jobs);

    return jobs;
  } catch (e) {
    throw e;
  }
}

async function findOne(jobID) {
  try {
    let job = await mysql.pool.query(
      'SELECT eng.id eng_id, eng.fname eng_fname, eng.lname eng_lname, ' +
      'con.id con_id, con.fname con_fname, con.lname con_lname, ' +
      'ac.id ac_id, ac.fname ac_fname, ac.lname ac_lname, ' +
      'start.name start_station, start.id start_station_id, end.name end_station, end.id end_station_id, ' +
      'train.id train_id, ' +
      'j.id, j.signup_time, j.signoff_time ' +
      'FROM job j ' +
      'LEFT JOIN employee eng ON eng.id = j.engineer_id ' +
      'LEFT JOIN employee con ON con.id = j.conductor_id ' +
      'LEFT JOIN employee ac ON ac.id = j.assistant_conductor_id ' +
      'INNER JOIN terminal start ON start.id = j.start_station_id ' +
      'INNER JOIN terminal end ON end.id = j.end_station_id ' +
      'LEFT JOIN train ON train.id = j.train_id ' +
      'WHERE j.id = ?',
      jobID
    );

    
    job = constructJobJSON(job);
 
    return job[0];
  } catch (e) {
    throw e;
  }
}

async function addOne(jobInfo) {
  const { jobID, trainID, engineerID, conductorID, assistantConductorID, startStationID,
    endStationID, signupTime, signoffTime } = jobInfo;

  try {
    if (signupTime === 'Invalid date' || signoffTime === 'Invalid date') {
      throw new Error('Must have valid dates for signup/signoff times');
    }

    await mysql.pool.query(
      'INSERT INTO job ' +
      '(id, train_id, engineer_id, conductor_id, assistant_conductor_id, start_station_id, ' +
      'end_station_id, signup_time, signoff_time) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [jobID, trainID, engineerID, conductorID, assistantConductorID, startStationID,
      endStationID, signupTime, signoffTime]
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function updateOne(jobInfo) {
  let { jobID, trainID, engineerID, conductorID, assistantConductorID } = jobInfo;

  try {
    trainID = trainID || null;
    engineerID = engineerID || null;
    conductorID = conductorID || null;
    assistantConductorID = assistantConductorID || null;

    await mysql.pool.query(
      'UPDATE job ' +
      'SET train_id = ?, engineer_id = ?, conductor_id = ?, assistant_conductor_id = ? ' +
      'WHERE job.id = ?',
      [trainID, engineerID, conductorID, assistantConductorID, jobID]
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteOne(jobID) {
  try {
    await mysql.pool.query(
      'DELETE FROM job WHERE id = ?',
      jobID
    );
  } catch (e) {
    throw e;
  }
}

async function removeConductor(empID) {
  try {
    await mysql.pool.query(
      'UPDATE job SET conductor_id = NULL WHERE conductor_id = ?',
      empID
    );
  } catch (e) {
    throw e;
  }
}

async function removeEngineer(empID) {
  try {
    await mysql.pool.query(
      'UPDATE job SET engineer_id = NULL WHERE engineer_id = ?',
      empID
    );
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
  removeConductor,
  removeEngineer,
}
