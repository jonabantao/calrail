import React from 'react';
import { Link } from 'react-router-dom';

const JobView = () => {
  return (
    <section>
      <h1>Job List</h1>
      <Link to="/jobs">Manange Jobs</Link>
      <table>
        <thead>
          <tr>
            <th>Train No.</th>
            <th>Train ID</th>
            <th>Engineer</th>
            <th>Conductor</th>
            <th>Assistant Conductor</th>
            <th>Start</th>
            <th>End</th>
            <th>Signup</th>
            <th>Signoff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>999</td>
            <td>999</td>
            <td>Sample Eng</td>
            <td>Sample Cond</td>
            <td><strong>EMPTY</strong></td>
            <td>San Francisco</td>
            <td>San Jose</td>
            <td>0400</td>
            <td>1200</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default JobView;
