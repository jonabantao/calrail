import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IRoute, routes  } from 'src/routes/dashboard-routes';
import NotFound from 'src/views/NotFound';


const styles = (theme: Theme) => ({
  content: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 30,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

interface IProps extends WithStyles<typeof styles> {
  drawerOpen: boolean;
}

const dashboardRoutes = routes.map((route: IRoute) => {
  const routeComponent = (props: any) => <route.component {...props} />;

  return <Route key={route.path} exact={true} path={route.path} component={routeComponent} />;
})

const DashboardRouter = ({ classes, drawerOpen }: IProps) => {
  return (
    <section className={classNames(classes.content, { [classes.contentShift]: !drawerOpen })}>
      <div className={classes.drawerHeader} />
      <Switch>
        {dashboardRoutes}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default withStyles(styles)(DashboardRouter);