import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class TrainForm extends PureComponent {
  state = {
    trainId: '',
    trainName: '',
    trainMake: '',
    trainModel: '',
  };

  resetForm() {
    this.setState({
      trainId: '',
      trainName: '',
      trainMake: '',
      trainModel: '',
    })
  }

  handleSave = () => {
    const trainInfo = Object.assign({}, this.state);

    axios.post('/api/trains/', trainInfo)
      .then(this.props.handleClose)
      .then(this.props.refreshTable);
  }
  
  handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  render() {
    const { newForm, handleClose, open } = this.props;

    const title = newForm ? 'Register New Train' : null;
  
    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField 
            type="number"
            label="Train ID"
            value={this.state.trainId}
            onChange={this.handleChange('trainId')}
            required
            fullWidth
          />
          <TextField 
            label="Train Designation"
            fullWidth
            value={this.state.trainName}
            onChange={this.handleChange('trainName')}
          />
          <TextField 
            label="Make"
            fullWidth
            value={this.state.trainMake}
            onChange={this.handleChange('trainMake')}
          />
          <TextField 
            label="Model"
            fullWidth
            value={this.state.trainModel}
            onChange={this.handleChange('trainModel')}
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

export default TrainForm;
