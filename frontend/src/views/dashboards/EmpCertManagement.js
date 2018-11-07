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

import dashboardStyles from '../../styles/dashboard';
import EmpCertForm from '../forms/EmpCertForm';


class EmpCertManagement extends Component {
  state = {
    employeesCerts: [],
    loading: false,
    employeeId: null,
    openModal: false,
  };

  fetchAndStoreEmployeesCerts = () => {
    this.setState(
      () => ({ loading: true }),
      () => axios.get('/api/employees/certifications')
        .then(res => this.setState({
          employeesCerts: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  componentDidMount() {
    this.fetchAndStoreEmployeesCerts();
  }

  handleOpenNew = () => {
    this.setState({
      newForm: true,
      openModal: true,
    });
  }

  handleClose = () => {
    this.setState({ openModal: false });
  }

  formatTime = (timeString) => {
    return moment(timeString).format('MM-DD-YYYY');
  }

  render() {
    const { classes, theme } = this.props;
    const { loading, employeesCerts } = this.state;

    const employeesAndCerts = employeesCerts.map(empCert => {
      return (
        <TableRow key={`${empCert.full_name}${empCert.title}`}>
          <TableCell>{empCert.full_name}</TableCell>
          <TableCell>{empCert.title}</TableCell>
          <TableCell>{this.formatTime(empCert.certification_date)}</TableCell>
        </TableRow>
      );
    });

    return (
      <Fragment>
        <Typography variant="h6" style={{ marginTop: theme.spacing.unit * 3 }}>
          Employees by Certification
          </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add Certification For Employee
          </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Certification Title</TableCell>
                  <TableCell>Certification Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesAndCerts}
              </TableBody>
            </Table>)}
        </Paper>
        {this.state.openModal && <EmpCertForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          refreshTable={this.fetchAndStoreEmployeesCerts}
        />}
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles, { withTheme: true })(EmpCertManagement);
