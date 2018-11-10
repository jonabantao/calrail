import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import CircularLoader from 'src/components/ui-loader/CircularLoader';
import IJob from 'src/models/job';
import Job from 'src/services/Job';
import TimeUtil from 'src/utils/time';
import JobForm from 'src/views/forms/JobForm';

import dashboardStyles from 'src/styles/dashboard';

interface IProps extends WithStyles<typeof dashboardStyles> { }

interface IState {
  employeeID?: number | null,
  jobs: IJob[],
  loading: boolean,
  openModal: boolean,
}


class JobManagement extends React.Component<IProps, IState> {
  public readonly state = {
    employeeID: null,
    jobs: [],
    loading: false,
    openModal: false,
  };

  public fetchAndStoreJobs = () => {
    Job.getJobs()
      .then(res => this.setState({
        jobs: res.data,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
  }

  public componentDidMount() {
    this.setState(() => ({ loading: true }), this.fetchAndStoreJobs);
  }

  public handleOpen = () => {
    this.setState({ openModal: true });
  }

  public handleClose = () => {
    this.setState({ openModal: false });
  }


  public render() {
    const { classes } = this.props;
    const { jobs, loading } = this.state;

    const jobRows = jobs.map((job: IJob) => (
      <TableRow key={job.id}>
        <TableCell>{job.id}</TableCell>
        <TableCell>
          {job.train_id === null ? 'EMPTY' : job.train_id}
        </TableCell>
        <TableCell>
          {job.engineer.fname === null ? 'EMPTY' : `${job.engineer.fname + ' ' + job.engineer.lname}`}
        </TableCell>
        <TableCell>
          {job.conductor.fname === null ? 'EMPTY' : `${job.conductor.fname + ' ' + job.conductor.lname}`}
        </TableCell>
        <TableCell>
          {job.assistant_conductor.fname === null ? 'EMPTY' : `${job.assistant_conductor.fname + ' ' + job.assistant_conductor.lname}`}
        </TableCell>
        <TableCell>{job.start_station}</TableCell>
        <TableCell>{job.end_station}</TableCell>
        <TableCell>{TimeUtil.formatHours(job.signup_time)}</TableCell>
        <TableCell>{TimeUtil.formatHours(job.signoff_time)}</TableCell>
      </TableRow>
    ));

    return (
      <React.Fragment>
        <Typography variant="h5">Job Management (Edit to be added later)</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpen}
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
        <JobForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          refreshTable={this.fetchAndStoreJobs}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(JobManagement);
