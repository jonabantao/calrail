import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import * as React from 'react';

import axios from 'axios';

interface IProps {
  newForm: boolean;
  open: boolean;
  handleClose: () => void;
  refreshTable: () => void;
}

interface IState {
  trainId: string,
  trainMake: string,
  trainModel: string,
  trainName: string,
}

class TrainForm extends React.Component<IProps, IState> {
  public state = {
    trainId: '',
    trainMake: '',
    trainModel: '',
    trainName: '',
  };

  public handleSave = () => {
    const trainInfo = Object.assign({}, this.state);

    axios.post('/api/trains/', trainInfo)
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
  
  public resetForm() {
    this.setState({
      trainId: '',
      trainMake: '',
      trainModel: '',
      trainName: '',
    })
  }


  public render() {
    const { newForm, handleClose, open } = this.props;

    const title = newForm ? 'Register New Train' : null;

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            name="trainId"
            type="number"
            label="Train ID"
            value={this.state.trainId}
            onChange={this.handleChange}
            required={true}
            fullWidth={true}
          />
          <TextField
            name="trainName"
            label="Train Designation"
            fullWidth={true}
            value={this.state.trainName}
            onChange={this.handleChange}
          />
          <TextField
            name="trainMake"
            label="Make"
            fullWidth={true}
            value={this.state.trainMake}
            onChange={this.handleChange}
          />
          <TextField
            name="trainModel"
            label="Model"
            fullWidth={true}
            value={this.state.trainModel}
            onChange={this.handleChange}
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
