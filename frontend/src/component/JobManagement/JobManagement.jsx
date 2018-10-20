import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './JobManagement.css';

class JobManagement extends Component {
  handlePlaceholder() {
    alert('Clicking on train or employee slots will fire a query to the database and populate available trains or employees.'
    + ' Implemented during backend.');
  }

  render() {
    return (
      <section id="placeholder">
        <h2>Job Management</h2>
        <Link to="/jobs/add">New Job</Link>
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
              <td><a href="#placeholder" onClick={this.handlePlaceholder}>999</a></td>
              <td><a href="#placeholder" onClick={this.handlePlaceholder}>Sample Eng</a></td>
              <td><a href="#placeholder" onClick={this.handlePlaceholder}>Sample Cond</a></td>
              <td className="JobManagement-fillred">
                <a href="#placeholder" onClick={this.handlePlaceholder}><strong>EMPTY</strong></a>
              </td>
              <td>San Francisco</td>
              <td>San Jose</td>
              <td>0400</td>
              <td>1200</td>
              <td><button>Delete</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default JobManagement;