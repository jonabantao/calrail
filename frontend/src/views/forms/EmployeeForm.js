import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'material-ui-pickers/DatePicker';
import KeyboardLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CalendarIcon from '@material-ui/icons/CalendarToday';

import axios from 'axios';
import moment from 'moment';

class EmployeeForm extends PureComponent {
  state = {
    employeeFName: '',
    employeeLName: '',
    employeeHomeId: '',
    employeeStartDate: null,
    homebaseOptions: [],
    disableButtons: false,
  };

  componentDidMount() {
    axios.get('/api/terminals/')
      .then(res => this.setState({ homebaseOptions: res.data }))
      .catch(console.error);
  }

  resetForm() {
    this.setState({
      employeeFName: '',
      employeeLName: '',
      employeeHomeId: '',
      employeeStartDate: null,
      homebaseOptions: [],
      disableButtons: false,
    })
  }

  handleSave = () => {
    let empInfo = Object.assign({}, this.state);
    delete empInfo.homebaseOptions;
    empInfo.employeeStartDate = moment(empInfo.employeeStartDate).format('YYYY-MM-DD');

    this.setState(() => ({ disableButtons: true }),
      () => axios.post('/api/employees/', empInfo)
        .then(this.props.handleClose)
        .then(this.props.refreshTable));
  }

  handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleDateChange = date => {
    this.setState({ employeeStartDate: date });
  }

  render() {
    const { newForm, handleClose, open } = this.props;
    const { homebaseOptions } = this.state;

    const title = newForm ? 'Register New Employee' : null;
    const terminalOptions = homebaseOptions.map(terminal => (
      <MenuItem value={terminal.id} key={terminal.id}>{terminal.name}</MenuItem>
    ));

    const changeFName = this.handleChange('employeeFName');
    const changeLName = this.handleChange('employeeLName');
    const changeHomebase = this.handleChange('employeeHomeId');

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            fullWidth
            value={this.state.employeeFName}
            onChange={changeFName}
            required
          />
          <TextField
            label="Last Name"
            fullWidth
            value={this.state.employeeLName}
            onChange={changeLName}
            required
          />
          <TextField
            select
            label="Home Base"
            fullWidth
            value={this.state.employeeHomeId}
            onChange={changeHomebase}
            required
          >
            <MenuItem value=""><em>Select a Homebase</em></MenuItem>
            {terminalOptions}
          </TextField>
          <DatePicker
            fullWidth
            keyboard
            label="Start Date"
            value={this.state.employeeStartDate}
            onChange={this.handleDateChange}
            invalidDateMessage="Invalid date"
            maxDateMessage="Date beyond maximum range"
            minDateMessage="Date beyond minimum range"
            keyboardIcon={<CalendarIcon />}
            leftArrowIcon={<KeyboardLeftIcon />}
            rightArrowIcon={<KeyboardRightIcon />}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSave}
            disabled={this.state.disableButtons}
          >
            Save
        </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClose}
            disabled={this.state.disableButtons}
          >
            Cancel
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EmployeeForm;
