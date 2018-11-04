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

import moment from 'moment';
import axios from 'axios';

class EmpCertForm extends PureComponent {
  state = {
    employeeId: '',
    certificationId: '',
    certificationDate: null,
    employeeList: [],
    certList: [],
    disableButtons: false,
  };

  componentDidMount() {
    axios.all([
      axios.get('/api/employees/'),
      axios.get('/api/certifications/'),
    ])
    .then(axios.spread((employees, certifications) => {
      let newState = {};

      newState.employeeList = employees.data;
      newState.certList = certifications.data;

      this.setState(newState);
    }))
    .catch(console.error);
  }

  resetForm() {
    this.setState({
      employeeId: '',
      certificationId: '',
      certificationDate: null,
      employeeList: [],
      certList: [],
      disableButtons: false,
    })
  }

  handleSave = () => {
    let { employeeList, certList, disableButtons, ...empCertInfo } = this.state;
    empCertInfo.certificationDate = this.formatTime(empCertInfo.certificationDate);

    this.setState(() => ({ disableButtons: true }),
      () => axios.post('/api/employees/certifications', empCertInfo)
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
    this.setState({ certificationDate: date });
  }

  formatTime = dateString => {
    return moment(dateString).format('YYYY-MM-DD');
  }

  render() {
    const { handleClose, open } = this.props;
    const { employeeList, certList } = this.state;

    const employees = employeeList.map(employee => (
      <MenuItem value={employee.id} key={employee.id}>
        {`${employee.fname} ${employee.lname}`}
      </MenuItem>
    ));

    const certOptions = certList.map(cert => (
      <MenuItem value={cert.id} key={cert.id}>{cert.title}</MenuItem>
    ));

    const changeEmployee = this.handleChange('employeeId');
    const changeCertification = this.handleChange('certificationId');

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Certify Employee</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Employee"
            fullWidth
            value={this.state.employeeId}
            onChange={changeEmployee}
            required
          >
            <MenuItem value=""><em>Select an Employee</em></MenuItem>
            {employees}
          </TextField>
          <TextField
            select
            label="Certification"
            fullWidth
            value={this.state.certificationId}
            onChange={changeCertification}
            required
          >
            <MenuItem value=""><em>Select a Certification</em></MenuItem>
            {certOptions}
          </TextField>
          <DatePicker
            fullWidth
            keyboard
            label="Certification Date"
            value={this.state.certificationDate}
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

export default EmpCertForm;
