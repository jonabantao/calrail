import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class TerminalForm extends Component {
  state = {
    terminalName: ''
  };

  resetForm() {
    this.setState({
      terminalName: '',
    })
  }

  handleSave = () => {
    const terminalInfo = Object.assign({}, this.state);

    axios.post('/api/terminals/', terminalInfo)
      .then(this.handleClose)
      .then(this.props.refreshTable)
      .catch(console.error);
  }

  handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  handleNameChange = e => {
    this.setState({ terminalName: e.target.value });
  }

  render() {
    const { newForm, handleClose, open } = this.props;

    const title = newForm ? 'Add New Terminal' : null;

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Terminal Name"
            fullWidth
            required
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
