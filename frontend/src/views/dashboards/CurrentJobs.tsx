import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core/';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Assignment';
import * as React from 'react';
import { Link } from 'react-router-dom';

import TableJobRow from 'src/components/table/job-row';
import CircularLoader from 'src/components/ui-loader/CircularLoader';
import IJob from 'src/models/job';
import Job from 'src/services/Job';

import dashboardStyles from 'src/styles/dashboard';


const JobsLink: React.SFC = (props: any) => <Link {...props} to="/jobs" />


interface IProps extends WithStyles<typeof dashboardStyles> { }

interface IState {
  jobs: IJob[];
  loading: boolean;
}

class CurrentJobs extends React.Component<IProps, IState> {
  public state = {
    jobs: [],
    loading: false,
  };

  public componentDidMount() {
    this.setState(() => ({ loading: true }), this.fetchAndStoreJobs);
  }

  public fetchAndStoreJobs = (): void => {
    Job.getAll()
      .then((res) => this.setState({
        jobs: res.data,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
  }

  public render() {
    const { classes } = this.props;
    const { jobs, loading } = this.state;

    const jobRows = jobs.map((job: IJob) => (
      <TableJobRow key={job.id} {...job} />
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
