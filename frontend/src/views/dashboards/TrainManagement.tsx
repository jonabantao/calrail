import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import CircularLoader from 'src/components/ui-loader/CircularLoader';
import ITrain from 'src/models/train';
import Train from 'src/services/Train';
import TrainForm from 'src/views/forms/TrainForm';

import dashboardStyles from 'src/styles/dashboard';


interface IProps extends WithStyles<typeof dashboardStyles> { }

interface IState {
  loading: boolean,
  newForm: boolean,
  openModal: boolean,
  trainId: string | null,
  trains: ITrain[],
}

class TrainManagement extends React.Component<IProps, IState> {
  public readonly state = {
    loading: false,
    newForm: true,
    openModal: false,
    trainId: null,
    trains: [],
  };

  public fetchAndStoreTrains = () => {
    this.setState(
      () => ({ loading: true }),
      () => Train.getAll()
        .then(res => this.setState({
          loading: false,
          trains: res.data,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  public componentDidMount() {
    this.fetchAndStoreTrains();
  }

  public handleOpenNew = () => {
    this.setState({
      newForm: true,
      openModal: true,
    });
  }

  public handleClose = () => {
    this.setState({ openModal: false });
  }

  public handleDelete = (trainID: string) => () => {
    Train.deleteOne(trainID)
      .then(this.fetchAndStoreTrains);
  }

  public render() {
    const { classes } = this.props;
    const { trains, loading, newForm } = this.state;

    const trainRows = trains.map((train: ITrain) => (
      <TableRow key={train.id}>
        <TableCell>{train.id}</TableCell>
        <TableCell>{train.name}</TableCell>
        <TableCell>{train.make}</TableCell>
        <TableCell>{train.model}</TableCell>
        <TableCell>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleDelete(train.id)}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <React.Fragment>
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
                  <TableCell />
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
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(TrainManagement);
