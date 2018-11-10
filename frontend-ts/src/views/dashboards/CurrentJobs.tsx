import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core/';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Assignment';
import * as React from 'react';
import { Link } from 'react-router-dom';

import CircularLoader from '../../components/ui-loader/CircularLoader';

import axios from 'axios';
import * as moment from 'moment';

import IJob from '../../models/job';

import dashboardStyles from '../../styles/dashboard';

interface IState {
  jobs: IJob[];
  loading: boolean;
}

interface IProps extends WithStyles<typeof dashboardStyles> { }

const JobsLink: React.SFC = (props: any) => <Link {...props} to="/jobs" />

class CurrentJobs extends React.Component<IProps, IState> {
  public state = {
    jobs: [],
    loading: false,
  };


  public componentDidMount() {
    this.setState(() => ({ loading: true }), this.fetchAndStoreJobs);
  }

  public fetchAndStoreJobs = (): void => {
    axios.get('/api/jobs')
      .then(res => this.setState({
        jobs: res.data,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
  }

  public formatHours = (hourString: string): string => {
    return moment(hourString, 'HH:mm:ss').format('HHmm');
  }

  public render() {
    const { classes } = this.props;
    const { jobs, loading } = this.state;

    const jobRows = jobs.map((job: IJob) => (
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
      <React.Fragment>
        <Typography variant="h5">Current Jobs</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={JobsLink}
          className={classes.button}
        >
          <EditIcon className={classes.iconRight} />
          Manage Jobs
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
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(CurrentJobs);
