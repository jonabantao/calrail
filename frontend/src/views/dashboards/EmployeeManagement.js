import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';
import moment from 'moment';
import CircularLoader from '../../component/ui-loader/CircularLoader';
import EmpCertManagement from './EmpCertManagement';

import dashboardStyles from '../../styles/dashboard';
import EmployeeForm from '../forms/EmployeeForm';


class EmployeeManagement extends Component {
  state = {
    employees: [],
    loading: false,
    new: true,
    employeeId: null,
    openModal: false,
  };

  fetchAndStoreEmployees = () => {
    this.setState(
      () => ({ loading: true }),
      () => axios.get('/api/employees')
        .then(res => this.setState({
          employees: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  componentDidMount() {
    this.fetchAndStoreEmployees();
  }

  handleOpenNew = () => {
    this.setState({
      newForm: true,
      openModal: true,
    });
  }

  handleDelete = empID => () => {
    axios.delete(`/api/employees/${empID}`)
      .then(this.fetchAndStoreEmployees)
      .catch(() => {
        if (this.state.loading) {
          this.setState({ loading: false });
        }
      })
  }

  handleEdit = empID => () => {
    alert('Under construction!');
  }

  handleClose = () => {
    this.setState({ openModal: false });
  }

  formatTime = (timeString) => {
    return moment(timeString).format('MM-DD-YYYY');
  }

  render() {
    const { classes } = this.props;
    const { employees, loading, newForm } = this.state;
    const employeeCount = this.state.employees.length;

    const employeeRows = employees.map(employee => {
      return (
        <TableRow key={employee.id}>
          <TableCell>{employee.id}</TableCell>
          <TableCell>{employee.fname}</TableCell>
          <TableCell>{employee.lname}</TableCell>
          <TableCell>{employee.homebase}</TableCell>
          <TableCell>{this.formatTime(employee.start_date)}</TableCell>
          <TableCell>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.handleEdit(employee.id)}
              style={{ marginRight: 16 }}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDelete(employee.id)}
            >
              Fire
            </Button>
          </TableCell>
        </TableRow>
      );

    })

    return (
      <Fragment>
        <Typography variant="h5">Employee Management</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add Employee
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Homebase</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeRows}
              </TableBody>
            </Table>)}
        </Paper>
        <EmployeeForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          newForm={newForm}
          refreshTable={this.fetchAndStoreEmployees}
          formatTime={this.formatTime}
        />
        <EmpCertManagement
          empCount={employeeCount}
        />
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(EmployeeManagement);
