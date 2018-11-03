import React, { PureComponent, Fragment } from 'react';
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


class EmpCertManagement extends PureComponent {
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

  handleClose = () => {
    this.setState({ openModal: false });
  }

  formatTime = (timeString) => {
    return moment(timeString).format('MM-DD-YYYY');
  }

  render() {
    const { classes, theme } = this.props;
    const { loading } = this.state;

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
                  <TableCell>Certification Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              </TableBody>
            </Table>)}
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles, { withTheme: true })(EmpCertManagement);
