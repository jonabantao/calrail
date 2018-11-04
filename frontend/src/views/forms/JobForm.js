import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TimePicker from 'material-ui-pickers/TimePicker';
import TimeIcon from '@material-ui/icons/AccessTime';

import axios from 'axios';
import moment from 'moment';

class JobForm extends Component {
  state = {
    jobId: '',
    trainId: '',
    engineerId: '',
    conductorId: '',
    assistantConductorId: '',
    startStationId: '',
    endStationId: '', 
    signupTime: null,
    signoffTime: null,
    trainList: [],
    engineerList: [],
    conductorList: [],
    employeeList: [],
    stationList: [],
  };

  componentDidMount() {
    axios.all([
      axios.get('/api/trains'),
      axios.get('/api/employees/engineers'),
      axios.get('/api/employees/conductors'),
      axios.get('/api/employees'),
      axios.get('/api/terminals')
    ])
    .then(axios.spread((trains, engineers, conductors, employees, terminals) => {
      let newState = {};

      newState.trainList = trains.data;
      newState.engineerList = engineers.data;
      newState.conductorList = conductors.data;
      newState.employeeList = employees.data;
      newState.stationList = terminals.data;

      this.setState(newState);
    }))
    .catch(console.error);
  }

  resetForm() {
    this.setState({
      jobId: '',
      trainId: '',
      engineerId: '',
      conductorId: '',
      assistantConductorId: '',
      startStationId: '',
      endStationId: '',
      signupTime: null,
      signoffTime: null,
    })
  }

  handleSave = () => {
    const { trainList,
      engineerList,
      conductorList,
      stationList,
      employeeList,
      ...jobInfo } = this.state;
    
    jobInfo.signupTime = this.formatTime(jobInfo.signupTime);
    jobInfo.signoffTime = this.formatTime(jobInfo.signoffTime);

    axios.post('/api/jobs/', jobInfo)
      .then(this.handleClose)
      .then(this.props.refreshTable)
      .catch(console.error);
  }

  handleClose = () => {
    console.log('hey')
    this.resetForm();
    this.props.handleClose();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleDateChange = prop => date => {
    this.setState({ [prop]: date.format() });
  }

  formatTime = timeString => {
    return moment(timeString).format('HH:mm:ss');
  }

  changeJobId = this.handleChange('jobId');
  changeTrainId = this.handleChange('trainId');
  changeEngineerId = this.handleChange('engineerId');
  changeConductorId = this.handleChange('conductorId');
  changeAssistantConductorId = this.handleChange('assistantConductorId');
  changeStartStationId = this.handleChange('startStationId');
  changeEndStationId = this.handleChange('endStationId');
  changeSignupTime = this.handleDateChange('signupTime');
  changeSignoffTime = this.handleDateChange('signoffTime');

  render() {
    const { handleClose, open } = this.props;
    const { trainList, engineerList, conductorList, employeeList, stationList } = this.state;

    const trainOptions = trainList.map(train => (
      <MenuItem value={train.id} key={train.id}>{`${train.name} ${train.id}`}</MenuItem>
    ));

    const engineerOptions = engineerList.map(engineer => (
      <MenuItem value={engineer.id} key={engineer.id}>{`${engineer.fname} ${engineer.lname}`}</MenuItem>
    ));

    const conductorOptions = conductorList.map(conductor => (
      <MenuItem value={conductor.id} key={conductor.id}>{`${conductor.fname} ${conductor.lname}`}</MenuItem>
    ));

    const employeeOptions = employeeList.map(employee => (
      <MenuItem value={employee.id} key={employee.id}>{`${employee.fname} ${employee.lname}`}</MenuItem>
    ));

    const stationOptions = stationList.map(station => (
      <MenuItem value={station.id} key={station.id}>{station.name}</MenuItem>
    ));


    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Job ID"
            value={this.state.jobId}
            onChange={this.changeJobId}
            required
            fullWidth
          />
          <TextField
            select
            label="Train"
            fullWidth
            value={this.state.trainId}
            onChange={this.changeTrainId}
          >
            <MenuItem value=""><em>Select a Train</em></MenuItem>
            {trainOptions}
          </TextField>
          <TextField
            select
            label="Engineer"
            fullWidth
            value={this.state.engineerId}
            onChange={this.changeEngineerId}
          >
            <MenuItem value=""><em>Select a Engineer</em></MenuItem>
            {engineerOptions}
          </TextField>
          <TextField
            select
            label="Conductor"
            fullWidth
            value={this.state.conductorId}
            onChange={this.changeConductorId}
          >
            <MenuItem value=""><em>Select a Conductor</em></MenuItem>
            {conductorOptions}
          </TextField>
          <TextField
            select
            label="Assistant Conductor"
            fullWidth
            value={this.state.assistantConductorId}
            onChange={this.changeAssistantConductorId}
          >
            <MenuItem value=""><em>Select an Assistant Conductor</em></MenuItem>
            {employeeOptions}
          </TextField>
          <div style={{ display: 'flex' }}>
            <TextField
              select
              label="Start Station"
              value={this.state.startStationId}
              onChange={this.changeStartStationId}
              style={{ flexGrow: 1 }}
            >
              <MenuItem value=""><em>Select an Start Station</em></MenuItem>
              {stationOptions}
            </TextField>
            <TextField
              select
              label="End Station"
              value={this.state.endStationId}
              onChange={this.changeEndStationId}
              style={{ flexGrow: 1, marginLeft: 8 }}
            >
              <MenuItem value=""><em>Select an End Station</em></MenuItem>
              {stationOptions}
            </TextField>
          </div>
          <div style={{ display: 'flex' }}>
            <TimePicker
              keyboard
              label="Signup Time"
              value={this.state.signupTime}
              onChange={this.changeSignupTime}
              invalidDateMessage="Invalid Time Format"
              keyboardIcon={<TimeIcon />}
              style={{ flexGrow: 1 }}
            />
            <TimePicker
              keyboard
              label="Signoff Time"
              value={this.state.signoffTime}
              onChange={this.changeSignoffTime}
              invalidDateMessage="Invalid Time Format"
              keyboardIcon={<TimeIcon />}
              style={{ flexGrow: 1, marginLeft: 8 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSave}
          >
            Save
        </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClose}
          >
            Cancel
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default JobForm;
