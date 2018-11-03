import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './views/Navbar';
import Dashboard from './views/Dashboard';

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
    );
  }
}

export default withStyles(styles)(App);
