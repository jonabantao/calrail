import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

const CircularLoader = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CircularProgress size={50} />
    </div>
  );
}

export default withStyles(styles)(CircularLoader);
