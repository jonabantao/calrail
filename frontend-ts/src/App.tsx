import MomentUtils from '@date-io/moment';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
  WithStyles 
} from '@material-ui/core/styles';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import DashboardRouter from 'src/components/DashboardRouter';
import NavBar from 'src/views/header/NavBar';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
  },
  typography: {
    useNextVariants: true,
  }
})

const styles = () => ({
  root: {
    display: 'flex',
  }
});

interface IState {
  drawerOpen: boolean,
  subdrawerOpen: boolean,
}

interface IProps extends WithStyles<typeof styles> { }

class App extends React.Component<IProps, IState> {
  public state: IState = {
    drawerOpen: true,
    subdrawerOpen: true,
  }

  public handleDrawerToggle = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  public handleSubdrawerToggle = () => {
    this.setState(state => ({ subdrawerOpen: !state.drawerOpen }));
  }

  public render() {
    const { classes } = this.props;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className={classes.root}>
              <CssBaseline />
              <NavBar
                drawerOpen={this.state.drawerOpen}
                subdrawerOpen={this.state.subdrawerOpen}
                handleDrawerToggle={this.handleDrawerToggle}
                handleSubdrawerToggle={this.handleSubdrawerToggle}
              />
              <DashboardRouter drawerOpen={this.state.drawerOpen} />
            </div>
          </Router>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(App);