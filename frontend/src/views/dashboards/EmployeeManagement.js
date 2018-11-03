import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const sampleEmployees = [
  {
    id: 123,
    firstName: 'John',
    lastName: 'Doe',
    homebase: 'San Francisco',
    certifications: [
      {
        certificationName: 'Conductor',
        certificationDate: '1-28-1902'
      }
    ],
    startDate: '1-1-1900'
  }, {
    id: 221,
    firstName: 'Jane',
    lastName: 'Doe',
    homebase: 'San Jose',
    certifications: [
      {
        certificationName: 'Engineer',
        certificationDate: '3-28-1930'
      }
    ],
    startDate: '2-1-1930',
  }, {
    id: 245,
    firstName: 'Bob',
    lastName: 'Ross',
    homebase: 'San Francisco',
    certifications: [
      {
        certificationName: 'Conductor',
        certificationDate: '1-28-1990'
      }, {
        certificationName: 'Engineer',
        certificationDate: '3-2-1997'
      }
    ],
    startDate: '1-1-1990',
  }, {
    id: 258,
    firstName: 'Charlie',
    lastName: 'Corn',
    homebase: 'San Francisco',
    certifications: [
      {
        certificationName: 'Conductor',
        certificationDate: '1-28-1902'
      }
    ],
    startDate: '1-1-1978',
  },
];

class EmployeeManagement extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    this.setState({ employees: sampleEmployees });
  }

  handleFilter = e => {
    console.log(!e.target.value);
    e.preventDefault();
    
    if (!e.target.value) {
      return this.setState({ employees: sampleEmployees });
    }

    const filteredEmployees = sampleEmployees
      .filter(employee => employee.certifications
        .some(cert => cert.certificationName === e.target.value));

    return this.setState({ employees: filteredEmployees });
  };

  render() {
    const employeeList = this.state.employees.map(employee => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.homebase}</td>
          <td>
            <ul>
              {employee.certifications.map(cert => <li key={cert.certificationName}>{cert.certificationName}</li>)}
            </ul>
          </td>
          <td>{employee.startDate}</td>
          <td>
            <Link to="/employees/edit">Edit</Link>
            <button>Remove</button>
          </td>
        </tr>
      );
    })

    return (
      <section>
        <h2>Employee Management</h2>
        <Link to="/employees/add">Register New Employee</Link>
        <div>
          <label htmlFor="">Filter By Certifications</label>
          <select name="" id="" onChange={this.handleFilter}>
            <option value="">All Employees</option>
            <option value="Conductor">Conductors</option>
            <option value="Engineer">Engineers</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Home Base</th>
              <th>Certifications</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {employeeList}
          </tbody>
        </table>
      </section>
    );
  }
}

export default EmployeeManagement;