import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import TimeIcon from '@material-ui/icons/AccessTime';
import TimePicker from 'material-ui-pickers/TimePicker';
import * as React from 'react';

import CircularLoader from '../../components/ui-loader/CircularLoader';

import axios from 'axios';
import * as moment from 'moment';

import IEmployee from 'src/models/employee';
import ITerminal from 'src/models/terminal';
import ITrain from 'src/models/train';

interface IProps {
  refreshTable: () => void;
  handleClose: () => void;
  open: boolean;
  newForm: boolean;
  jobID: string | null;
}

interface IState {
  assistantConductorID: string,
  conductorID: string,
  endStationID: string,
  engineerID: string,
  jobID: string,
  signoffTime: string,
  signupTime: string,
  startStationID: string,
  trainID: string,
  loading: boolean,
}

const formatTime = (timeString: string): string => {
  return moment(timeString).format('HH:mm:ss');
}

class JobForm extends React.Component<IProps, IState> {
  public readonly state = {
    assistantConductorID: '',
    conductorID: '',
    endStationID: '',
    engineerID: '',
    jobID: '',
    loading: !this.props.newForm,
    signoffTime: '',
    signupTime: '',
    startStationID: '',
    trainID: '',
  };

  private conductorList = [];
  private employeeList = [];
  private engineerList = [];
  private stationList = [];
  private trainList = [];

  public componentDidMount() {
    axios.all([
      axios.get('/api/trains'),
      axios.get('/api/employees/engineers'),
      axios.get('/api/employees/conductors'),
      axios.get('/api/employees'),
      axios.get('/api/terminals')
    ])
      .then(axios.spread((trains, engineers, conductors, employees, terminals) => {
        this.conductorList = conductors.data;
        this.employeeList = employees.data;
        this.engineerList = engineers.data;
        this.stationList = terminals.data;
        this.trainList = trains.data;
      }))
      .then(() => {
        if (this.props.jobID !== null) {
          axios.get(`/api/jobs/${this.props.jobID}`)
            .then(res => res.data)
            .then((job: any) => this.setState({
              assistantConductorID: job.assistant_conductor.id || '',
              conductorID: job.conductor.id || '',
              endStationID: job.end_station_id,
              engineerID: job.engineer.id || '',
              jobID: job.id,
              loading: false,
              signoffTime: moment(job.signoff_time, 'HH:mm:ss').format(),
              signupTime: moment(job.signoff_time, 'HH:mm:ss').format(),
              startStationID: job.start_station_id,
              trainID: job.train_id,
            }));
        } else {
          return;
        }
      })
      .catch();
  }

  public resetForm() {
    this.setState({
      assistantConductorID: '',
      conductorID: '',
      endStationID: '',
      engineerID: '',
      jobID: '',
      signoffTime: '',
      signupTime: '',
      startStationID: '',
      trainID: '',
    })
  }

  public handleSave = () => {
    const { ...jobInfo } = this.state;

    jobInfo.signupTime = formatTime(jobInfo.signupTime);
    jobInfo.signoffTime = formatTime(jobInfo.signoffTime);

    if (this.props.newForm) {
      return axios.post('/api/jobs/', jobInfo)
        .then(this.handleClose)
        .then(this.props.refreshTable)
        .catch();
    } else {
      return axios.patch(`/api/jobs/${this.props.jobID}`, jobInfo)
        .then(this.handleClose)
        .then(this.props.refreshTable)
        .catch();
    }
  }

  public handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value } as any);
  }

  public handleSignoffTime = (date: any) => {
    this.setState({ signoffTime: date.format() });
  }

  public handleSignupTime = (date: any) => {
    this.setState({ signupTime: date.format() });
  }


  public render() {
    const { handleClose, open } = this.props;

    const editMode = !this.props.newForm;

    const trainOptions = this.trainList.map((train: ITrain) => (
      <MenuItem value={train.id} key={train.id}>{`${train.name} ${train.id}`}</MenuItem>
    ));

    const engineerOptions = this.engineerList.map((engineer: IEmployee) => (
      <MenuItem value={engineer.id} key={engineer.id}>{`${engineer.fname} ${engineer.lname}`}</MenuItem>
    ));

    const conductorOptions = this.conductorList.map((conductor: IEmployee) => (
      <MenuItem value={conductor.id} key={conductor.id}>{`${conductor.fname} ${conductor.lname}`}</MenuItem>
    ));

    const employeeOptions = this.employeeList.map((employee: IEmployee) => (
      <MenuItem value={employee.id} key={employee.id}>{`${employee.fname} ${employee.lname}`}</MenuItem>
    ));

    const stationOptions = this.stationList.map((station: ITerminal) => (
      <MenuItem value={station.id} key={station.id}>{station.name}</MenuItem>
    ));


    return (
      <Dialog onClose={handleClose} open={open} >
        {this.state.loading ? <DialogContent><CircularLoader /></DialogContent> : (
          <React.Fragment>
            <DialogTitle>{editMode ? 'Edit Job' : 'Add New Job'}</DialogTitle>
            <DialogContent>
              <TextField
                name="jobID"
                type="number"
                label="Job ID"
                value={this.state.jobID}
                onChange={this.handleChange}
                required={true}
                fullWidth={true}
                disabled={editMode}
              />
              <TextField
                name="trainID"
                select={true}
                label="Train"
                fullWidth={true}
                value={this.state.trainID}
                onChange={this.handleChange}
              >
                <MenuItem value=""><em>Select a Train</em></MenuItem>
                {trainOptions}
              </TextField>
              <TextField
                name="engineerID"
                select={true}
                label="Engineer"
                fullWidth={true}
                value={this.state.engineerID}
                onChange={this.handleChange}
              >
                <MenuItem value=""><em>Select a Engineer</em></MenuItem>
                {engineerOptions}
              </TextField>
              <TextField
                name="conductorID"
                select={true}
                label="Conductor"
                fullWidth={true}
                value={this.state.conductorID}
                onChange={this.handleChange}
              >
                <MenuItem value=""><em>Select a Conductor</em></MenuItem>
                {conductorOptions}
              </TextField>
              <TextField
                name="assistantConductorID"
                select={true}
                label="Assistant Conductor"
                fullWidth={true}
                value={this.state.assistantConductorID}
                onChange={this.handleChange}
              >
                <MenuItem value=""><em>Select an Assistant Conductor</em></MenuItem>
                {employeeOptions}
              </TextField>
              <div style={{ display: 'flex' }}>
                <TextField
                  name="startStationID"
                  select={true}
                  label="Start Station"
                  value={this.state.startStationID}
                  onChange={this.handleChange}
                  style={{ flexGrow: 1 }}
                  disabled={editMode}
                >
                  <MenuItem value=""><em>Select an Start Station</em></MenuItem>
                  {stationOptions}
                </TextField>
                <TextField
                  name="endStationID"
                  select={true}
                  label="End Station"
                  value={this.state.endStationID}
                  onChange={this.handleChange}
                  style={{ flexGrow: 1, marginLeft: 8 }}
                  disabled={editMode}
                >
                  <MenuItem value=""><em>Select an End Station</em></MenuItem>
                  {stationOptions}
                </TextField>
              </div>
              <div style={{ display: 'flex' }}>
                <TimePicker
                  keyboard={true}
                  label="Signup Time"
                  value={this.state.signupTime}
                  onChange={this.handleSignupTime}
                  invalidDateMessage="Invalid Time Format"
                  keyboardIcon={<TimeIcon />}
                  style={{ flexGrow: 1 }}
                  disabled={editMode}
                />
                <TimePicker
                  keyboard={true}
                  label="Signoff Time"
                  value={this.state.signoffTime}
                  onChange={this.handleSignoffTime}
                  invalidDateMessage="Invalid Time Format"
                  keyboardIcon={<TimeIcon />}
                  style={{ flexGrow: 1, marginLeft: 8 }}
                  disabled={editMode}
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
          </React.Fragment>
        )}
      </Dialog>
    );
  }
}

export default JobForm;
