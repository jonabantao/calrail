import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
import * as React from 'react';

import axios from 'axios';


interface IProps {
  handleClose: () => void;
  refreshTable: () => void;
  newForm: boolean;
  open: boolean;
}

interface IState {
  certificationTitle: string;
}

class CertificationForm extends React.Component<IProps, IState> {
  public readonly state = {
    certificationTitle: ''
  };

  public resetForm() {
    this.setState({
      certificationTitle: '',
    })
  }

  public handleSave = () => {
    const certInfo = Object.assign({}, this.state);

    axios.post('/api/certifications/', certInfo)
      .then(this.handleClose)
      .then(this.props.refreshTable)
      .catch();
  }

  public handleClose = () => {
    this.resetForm();
    this.props.handleClose();
  }

  public handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ certificationTitle: e.target.value });
  }

  public render() {
    const { newForm, handleClose, open } = this.props;

    const title = newForm ? 'Add New Certification' : null;

    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="Certification Title"
            fullWidth={true}
            required={true}
            value={this.state.certificationTitle}
            onChange={this.handleTitleChange}
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

export default CertificationForm;
