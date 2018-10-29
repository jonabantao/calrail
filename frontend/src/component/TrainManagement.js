import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TrainManagement extends Component {
  render() {
    return (
      <section>
        <h2>Train Management</h2>
        <Link to="/trains/add">Register New Train</Link>
        <table>
          <thead>
            <tr>
              <th>Train (Engine) ID</th>
              <th>Name</th>
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>999</td>
              <td>TSM</td>
              <td>Trainmaker</td>
              <td>Sample Model</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default TrainManagement;