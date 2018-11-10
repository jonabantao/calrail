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
  refreshTable: () => void;
  handleClose: () => void;
  newForm: boolean;
  open: boolean;
}

interface IState {
  terminalName: string;
}

class TerminalForm extends React.Component<IProps, IState> {
  public readonly state = {
    terminalName: ''
  };

  public resetForm() {
    this.setState({
      terminalName: '',
    })
  }

  public handleSave = () => {
    const terminalInfo = Object.assign({}, this.state);

    axios.post('/api/terminals/', terminalInfo)
      .then(this.handleClose)
      .then(this.props.refreshTable)
      .catch();
  }

  public handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  public handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ terminalName: e.target.value });
  }

  public render() {
    const { newForm, handleClose, open } = this.props;

    const title = newForm ? 'Add New Terminal' : null;

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Terminal Name"
            fullWidth={true}
            required={true}
            value={this.state.terminalName}
            onChange={this.handleNameChange}
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

export default TerminalForm;
