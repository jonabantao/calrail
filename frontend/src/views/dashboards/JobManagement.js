import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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

class JobManagement extends Component {
  state = {
    jobs: [],
    loading: false,
  };

  fetchAndStoreJobs = () => {
    axios.get('/api/jobs')
      .then(res => this.setState({
        jobs: res.data,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
  }

  componentDidMount() {
    this.setState(() => ({ loading: true }), this.fetchAndStoreJobs);
  }

  formatHours = (hourString) => {
    return moment(hourString, 'HH:mm:ss').format('HHmm');
  }

  render() {
    const { classes } = this.props;
    const { jobs, loading } = this.state;

    const jobRows = jobs.map(job => (
      <TableRow key={job.id}>
        <TableCell>{job.id}</TableCell>
        <TableCell>{job.train_id}</TableCell>
        <TableCell>{`${job.engineer.fname} ${job.engineer.lname}`}</TableCell>
        <TableCell>{`${job.conductor.fname} ${job.conductor.lname}`}</TableCell>
        <TableCell>{`${job.assistant_conductor.fname} ${job.assistant_conductor.lname}`}</TableCell>
        <TableCell>{job.start_station}</TableCell>
        <TableCell>{job.end_station}</TableCell>
        <TableCell>{this.formatHours(job.signup_time)}</TableCell>
        <TableCell>{this.formatHours(job.signoff_time)}</TableCell>
      </TableRow>
    ));

    return (
      <Fragment>
        <Typography variant="h5">Job Management (Edit to be added later)</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/jobs/new"
          className={classes.button}
        >
          <AddIcon className={classes.iconRight} />
          Add New Job
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Train No.</TableCell>
                <TableCell>Train ID</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Conductor</TableCell>
                <TableCell>Assistant</TableCell>
                <TableCell>Start Station</TableCell>
                <TableCell>End Station</TableCell>
                <TableCell>Signup</TableCell>
                <TableCell>Signoff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobRows}
            </TableBody>
          </Table>)}
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(JobManagement);
