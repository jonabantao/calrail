import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './component/Navbar/Navbar';
import JobView from './component/JobView/JobView';
import JobManagement from './component/JobManagement/JobManagement';
import AddJob from './component/JobManagement/AddJob/AddJob';
import EmployeeManagement from './component/EmployeeManagement/EmployeeManagement';
import AddEmployee from './component/EmployeeManagement/AddEmployee/AddEmployee';
import EditEmployee from './component/EmployeeManagement/EditEmployee/EditEmployee';
import TrainManagement from './component/TrainManagement/TrainManagement';
import AddTrain from './component/TrainManagement/AddTrain/AddTrain';
import TerminalManagement from './component/TerminalManagement/TerminalManagement';
import CertificationManagement from './component/CertificationManagement/CertificationManagement';
import NotFound from './component/NotFound/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={JobView} />
            <Route exact path="/jobs" component={JobManagement} />
            <Route exact path="/jobs/add" component={AddJob} />
            <Route exact path="/employees" component={EmployeeManagement} />
            <Route exact path="/employees/add" component={AddEmployee} />
            <Route exact path="/employees/edit" component={EditEmployee} />
            <Route exact path="/trains" component={TrainManagement} />
            <Route exact path="/trains/add" component={AddTrain} />
            <Route exact path="/terminals" component={TerminalManagement} />
            <Route exact path="/certifications" component={CertificationManagement} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
