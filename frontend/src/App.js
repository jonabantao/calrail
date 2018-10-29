import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './component/Navbar';
import Dashboard from './component/Dashboard';

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
          {/*
            <Route exact path="/employees" component={EmployeeManagement} />
            <Route exact path="/employees/add" component={AddEmployee} />
            <Route exact path="/employees/edit" component={EditEmployee} />
            <Route exact path="/trains" component={TrainManagement} />
            <Route exact path="/trains/add" component={AddTrain} />
            <Route exact path="/terminals" component={TerminalManagement} />
            <Route exact path="/certifications" component={CertificationManagement} />
            <Route component={NotFound} />
          </Switch> */}
        </main>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
