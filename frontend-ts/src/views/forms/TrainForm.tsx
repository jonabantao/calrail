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
  id: string,
  make: string,
  model: string,
  name: string,
}

class TrainForm extends React.Component<IProps, IState> {
  public state = {
    id: '',
    make: '',
    model: '',
    name: '',
  };

  public handleSave = () => {
    const { ...trainInfo } = this.state;

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
      id: '',
      make: '',
      model: '',
      name: '',
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
            name="id"
            type="number"
            label="Train ID"
            value={this.state.id}
            onChange={this.handleChange}
            required={true}
            fullWidth={true}
          />
          <TextField
            name="name"
            label="Train Designation"
            fullWidth={true}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            name="make"
            label="Make"
            fullWidth={true}
            value={this.state.make}
            onChange={this.handleChange}
          />
          <TextField
            name="model"
            label="Model"
            fullWidth={true}
            value={this.state.model}
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
