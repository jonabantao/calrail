import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EmployeeManagement extends Component {
  render() {
    return (
      <section>
        <h2>Employee Management</h2>
        <Link to="/employees/add">Register New Employee</Link>
        <div>
          <label htmlFor="">Filter By Certifications</label>
          <select name="" id="">
            <option value="">Engineer, Conductor, etc</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Home Base</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>Doe</td>
              <td>San Francisco</td>
              <td>1-1-1900</td>
              <td>
                <Link to="/employees/edit">Edit</Link>
                <button>Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default EmployeeManagement;