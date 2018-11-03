import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

import Navbar from './views/Navbar';
import Dashboard from './views/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
  }
});

const styles = theme => ({
  root: {
    display: 'flex',
  }
});

class App extends Component {
  state = {
    drawerOpen: true,
    subdrawerOpen: true,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  handleSubdrawerToggle = () => {
    this.setState(state => ({ subdrawerOpen: !state.subdrawerOpen }));
  };

  render() {
    const { classes } = this.props;
    
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <main className={classes.root}>
              <CssBaseline />
              <Navbar
                drawerOpen={this.state.drawerOpen}
                subdrawerOpen={this.state.subdrawerOpen}
                handleDrawerToggle={this.handleDrawerToggle}
                handleSubdrawerToggle={this.handleSubdrawerToggle}
              />
              <Dashboard drawerOpen={this.state.drawerOpen} />
            </main>
          </Router>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(App);
