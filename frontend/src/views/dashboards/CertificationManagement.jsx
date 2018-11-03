import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';
import CircularLoader from '../../component/ui-loader/CircularLoader';
import CertificationForm from '../forms/CertificationForm';

import dashboardStyles from '../../styles/dashboard';

class CertificationManagement extends Component {
  state = {
    certifications: [],
    loading: false,
    new: true,
    trainId: null,
    openModal: false,
  };

  fetchAndStoreCertifications = () => {
    this.setState(
      () => ({ loading: true }),
      () => axios.get('/api/certifications')
        .then(res => this.setState({
          certifications: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  componentDidMount() {
    this.fetchAndStoreCertifications();
  }

  handleOpenNew = () => {
    this.setState({
      newForm: true,
      openModal: true,
    });
  }

  handleClose = () => {
    this.setState({ openModal: false });
  }

  render() {
    const { classes } = this.props;
    const { certifications, loading, newForm } = this.state;

    const certificationRows = certifications.map(certification => (
      <TableRow key={certification.id}>
        <TableCell>{certification.title}</TableCell>
      </TableRow>
    ));

    return (
      <Fragment>
        <Typography variant="h5">Certification Management</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add New Certification
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Certification Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificationRows}
              </TableBody>
            </Table>)}
        </Paper>
        <CertificationForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          newForm={newForm}
          refreshTable={this.fetchAndStoreCertifications}
        />
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(CertificationManagement);