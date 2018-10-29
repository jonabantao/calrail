import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import JobView from '../component/JobView';
import JobManagement from '../component/JobManagement';
import AddJob from '../component/JobManagement/AddJob';
import NotFound from '../component/NotFound';

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: theme.spacing.unit * 30,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

const Dashboard = ({ classes, drawerOpen }) => {
  return (
    <section className={classNames(classes.content, { [classes.contentShift]: !drawerOpen })}>
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={JobView} />
          <Route exact path="/jobs" component={JobManagement} />
          <Route exact path="/jobs/new" component={AddJob} />
          <Route component={NotFound} />
        </Switch>
    </section>
  );
};

export default withStyles(styles)(Dashboard);