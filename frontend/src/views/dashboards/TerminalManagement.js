import React, { PureComponent, Fragment } from 'react';
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
import TerminalForm from '../forms/TerminalForm';

import dashboardStyles from '../../styles/dashboard';

class TerminalManagement extends PureComponent {
  state = {
    terminals: [],
    loading: false,
    new: true,
    trainId: null,
    openModal: false,
  };

  fetchAndStoreTerminals = () => {
    this.setState(
      () => ({ loading: true }),
      () => axios.get('/api/terminals')
        .then(res => this.setState({
          terminals: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  componentDidMount() {
    this.fetchAndStoreTerminals();
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
    const { terminals, loading, newForm } = this.state;

    const terminalRows = terminals.map(terminal => (
      <TableRow key={terminal.id}>
        <TableCell>{terminal.name}</TableCell>
      </TableRow>
    ));

    return (
      <Fragment>
        <Typography variant="h5">Terminal Management</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add New Station (Terminal)
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Terminal Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {terminalRows}
              </TableBody>
            </Table>)}
        </Paper>
        <TerminalForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          newForm={newForm}
          refreshTable={this.fetchAndStoreTerminals}
        />
      </Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(TerminalManagement);