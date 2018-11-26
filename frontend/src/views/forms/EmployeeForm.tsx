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
import * as React from 'react';

import ITerminal from 'src/models/terminal';
import Employee from 'src/services/Employee';
import Terminal from 'src/services/Terminal';

import { Moment } from 'moment';

interface IState {
  fName: string;
  homeID: string;
  homebaseOptions: ITerminal[],
  lName: string;
  startDate: string;
}

interface IProps {
  employeeID: string | undefined,
  refreshTable: () => void;
  handleClose: () => void;
  newForm: boolean;
  open: boolean;
}

class EmployeeForm extends React.Component<IProps, IState> {
  public state = {
    fName: '',
    homeID: '',
    homebaseOptions: [],
    lName: '',
    startDate: '',
  };

  public componentDidMount() {
    Terminal.getAll()
      .then(res => this.setState({ homebaseOptions: res.data }))
      .catch();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { employeeID } = this.props;

    if (employeeID !== undefined && prevProps.employeeID !== employeeID) {
      Employee.getOne(employeeID)
        .then(res => res.data)
        .then((emp) => {
          this.setState({
            fName: emp.fname,
            homeID: emp.homebase_id,
            lName: emp.lname,
            startDate: emp.start_date,
          });
        });
    }
  }

  public resetForm() {
    this.setState({
      fName: '',
      homeID: '',
      lName: '',
      startDate: '',
    })
  }

  public handleSave = () => {
    const { homebaseOptions, ...empInfo } = this.state;

    if (this.props.newForm) {
      Employee.addOne(empInfo)
        .then(this.handleClose)
        .then(this.props.refreshTable)
        .catch();
    } else {
      if (this.props.employeeID){
        Employee.updateOne(this.props.employeeID, empInfo)
          .then(this.handleClose)
          .then(this.props.refreshTable)
          .catch();
      }
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

  public handleDateChange = (date: Moment) => {
    this.setState({ startDate: date.format('YYYY-MM-DD') });
  }

  public render() {
    const { newForm, handleClose, open } = this.props;
    const { homebaseOptions } = this.state;

    const title = newForm ? 'Register New Employee' : 'Edit Employee';
    const terminalOptions = homebaseOptions.map((terminal: ITerminal) => (
      <MenuItem value={terminal.id} key={terminal.id}>{terminal.name}</MenuItem>
    ));

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="fName"
            fullWidth={true}
            value={this.state.fName}
            onChange={this.handleChange}
            required={true}
          />
          <TextField
            label="Last Name"
            name="lName"
            fullWidth={true}
            value={this.state.lName}
            onChange={this.handleChange}
            required={true}
          />
          <TextField
            select={true}
            label="Home Base"
            name="homeID"
            fullWidth={true}
            value={this.state.homeID}
            onChange={this.handleChange}
            required={true}
          >
            <MenuItem value=""><em>Select a Homebase</em></MenuItem>
            {terminalOptions}
          </TextField>
          <DatePicker
            fullWidth={true}
            keyboard={true}
            label="Start Date"
            value={this.state.startDate}
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

export default EmployeeForm;
