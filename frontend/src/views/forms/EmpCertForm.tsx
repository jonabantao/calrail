import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import KeyboardLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DatePicker from 'material-ui-pickers/DatePicker';
import React, { Component } from 'react';

import axios from 'axios';
import ICertification from 'src/models/certification';
import IEmployee from 'src/models/employee';

import { Moment } from 'moment';

interface IProps {
  handleClose: () => void;
  refreshTable: () => void;
  open: boolean;
}

class EmpCertForm extends Component<IProps> {
  public readonly state = {
    certList: [],
    certificationDate: '',
    certificationID: '',
    employeeID: '',
    employeeList: [],
  };

  public componentDidMount() {
    axios.all([
      axios.get('/api/employees/'),
      axios.get('/api/certifications/'),
    ])
      .then(axios.spread((employees, certifications) => {
        const newState = {
          certList: certifications.data,
          employeeList: employees.data,
        };

        this.setState(newState);
      }))
      .catch();
  }

  public resetForm() {
    this.setState({
      certificationDate: '',
      certificationID: '',
      employeeID: '',
    })
  }

  public handleSave = () => {
    const { employeeList, certList, ...empCertInfo } = this.state;

    axios.post('/api/employees/certifications', empCertInfo)
      .then(this.handleClose)
      .then(this.props.refreshTable)
      .catch();
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

  public handleDateChange = (date: Moment) => {
    this.setState({ certificationDate: date.format('YYYY-MM-DD') });
  }

  public render() {
    const { handleClose, open } = this.props;
    const { employeeList, certList } = this.state;

    const employees = employeeList.map((employee: IEmployee) => (
      <MenuItem value={employee.id} key={employee.id}>
        {`${employee.fname} ${employee.lname}`}
      </MenuItem>
    ));

    const certOptions = certList.map((cert: ICertification) => (
      <MenuItem value={cert.id} key={cert.id}>{cert.title}</MenuItem>
    ));

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Certify Employee</DialogTitle>
        <DialogContent>
          <TextField
            name="employeeID"
            select={true}
            label="Employee"
            fullWidth={true}
            value={this.state.employeeID}
            onChange={this.handleChange}
            required={true}
          >
            <MenuItem value=""><em>Select an Employee</em></MenuItem>
            {employees}
          </TextField>
          <TextField
            name="certificationID"
            select={true}
            label="Certification"
            fullWidth={true}
            value={this.state.certificationID}
            onChange={this.handleChange}
            required={true}
          >
            <MenuItem value=""><em>Select a Certification</em></MenuItem>
            {certOptions}
          </TextField>
          <DatePicker
            fullWidth={true}
            keyboard={true}
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

export default EmpCertForm;
