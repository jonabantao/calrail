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
import TrainForm from '../forms/TrainForm';

import dashboardStyles from '../../styles/dashboard';

class TrainManagement extends Component {
  state = {
    trains: [],
    loading: false,
    new: true,
    trainId: null,
    openModal: false,
  };

  fetchAndStoreTrains = () => {
    this.setState(
      () => ({ loading: true }),
      () => axios.get('/api/trains')
        .then(res => this.setState({
          trains: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  componentDidMount() {
    this.fetchAndStoreTrains();
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
    const { trains, loading, newForm } = this.state;

    const trainRows = trains.map(train => (
      <TableRow key={train.id}>
        <TableCell>{train.id}</TableCell>
        <TableCell>{train.name}</TableCell>
        <TableCell>{train.make}</TableCell>
        <TableCell>{train.model}</TableCell>
      </TableRow>
    ));

    return (
      <Fragment>
        <Typography variant="h5">Train Management</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Register New Train
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Train ID</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Make</TableCell>
                  <TableCell>Model</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainRows}
              </TableBody>
            </Table>)}
        </Paper>
        <TrainForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          newForm={newForm}
          refreshTable={this.fetchAndStoreTrains}
        />
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(TrainManagement);
