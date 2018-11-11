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
import ITerminal from 'src/models/terminal';
import TerminalForm from 'src/views/forms/TerminalForm';

import dashboardStyles from 'src/styles/dashboard';

import Terminal from 'src/services/Terminal';


interface IProps extends WithStyles<typeof dashboardStyles> { }

class TerminalManagement extends React.Component<IProps> {
  public readonly state = {
    loading: false,
    newForm: true,
    openModal: false,
    terminals: [],
  };

  public fetchAndStoreTerminals = () => {
    this.setState(
      () => ({ loading: true }),
      () => Terminal.getAll()
        .then(res => this.setState({
          loading: false,
          terminals: res.data,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  public componentDidMount() {
    this.fetchAndStoreTerminals();
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

  public render() {
    const { classes } = this.props;
    const { terminals, loading, newForm } = this.state;

    const terminalRows = terminals.map((terminal: ITerminal) => (
      <TableRow key={terminal.id}>
        <TableCell>{terminal.name}</TableCell>
      </TableRow>
    ));

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(TerminalManagement);