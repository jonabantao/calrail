const mysql = require('../config/db-con');

async function findAll() {
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
      jsonJob.end_station = job.end_station;
      jsonJob.signup_time = job.signup_time;
      jsonJob.signoff_time = job.signoff_time;

      return jsonJob;
    })
  );

  try {
    let jobs = await mysql.pool.query(
      `SELECT eng.id eng_id, eng.fname eng_fname, eng.lname eng_lname,
      con.id con_id, con.fname con_fname, con.lname con_lname,
      ac.id ac_id, ac.fname ac_fname, ac.lname ac_lname,
      start.name start_station, end.name end_station,
      train.id train_id,
      j.id, j.signup_time, j.signoff_time
      FROM job j
      INNER JOIN employee eng ON eng.id = j.engineer_id
      INNER JOIN employee con ON con.id = j.conductor_id
      INNER JOIN employee ac ON ac.id = j.assistant_conductor_id
      INNER JOIN terminal start ON start.id = j.start_station_id
      INNER JOIN terminal end ON end.id = j.end_station_id
      INNER JOIN train ON train.id = j.train_id`
    )

    jobs = constructJobJSON(jobs);

    return jobs;
  } catch (e) {
    throw new Error(e);
  }
}

async function addOne(jobInfo) {
  const { jobId, trainId, engineerId, conductorId, assistantConductorId, startStationId,
    endStationId, signupTime, signoffTime } = jobInfo;

  try {
    await mysql.pool.query(
      `INSERT INTO job 
      (id, train_id, engineer_id, conductor_id, assistant_conductor_id, start_station_id,
        end_station_id, signup_time, signoff_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [jobId, trainId, engineerId, conductorId, assistantConductorId, startStationId,
      endStationId, signupTime, signoffTime]
    );
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

module.exports = {
  findAll,
  addOne,
}
