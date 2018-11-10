import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  }
});

interface IProps extends WithStyles<typeof styles> { }

const CircularLoader: React.SFC<IProps> = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CircularProgress size={50} />
    </div>
  );
}

export default withStyles(styles)(CircularLoader);
