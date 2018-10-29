import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Assignment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconRight: {
    marginRight: theme.spacing.unit,
  }
});

class JobView extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5">Current Jobs</Typography>
        <Button 
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/jobs"
          className={classes.button}
        >
          <EditIcon className={classes.iconRight} />
          Manage Jobs
        </Button>
        <Paper className={classes.root}>
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
              <TableRow>
                <TableCell>999</TableCell>
                <TableCell>999</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell>Conductor</TableCell>
                <TableCell>Assistant</TableCell>
                <TableCell>Start Station</TableCell>
                <TableCell>End Station</TableCell>
                <TableCell>Signup</TableCell>
                <TableCell>Signoff</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(styles)(JobView);
