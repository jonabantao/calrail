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
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import CircularLoader from 'src/components/ui-loader/CircularLoader';
import IEmployeeCertification from 'src/models/employee-cert';
import Employee from 'src/services/Employee';
import TimeUtil from 'src/utils/time';
import EmpCertForm from 'src/views/forms/EmpCertForm';

import dashboardStyles from 'src/styles/dashboard';


interface IProps extends WithStyles<typeof dashboardStyles> {
  empCount: number;
  theme: Theme
}

interface IState {
  employeeID: number | null;
  employeesCerts: any;
  loading: boolean;
  openModal: boolean;
}

class EmpCertManagement extends React.Component<IProps, IState> {
  public readonly state = {
    employeeID: null,
    employeesCerts: [],
    loading: false,
    openModal: false,
  };

  public fetchAndStoreEmployeesCerts = () => {
    this.setState(
      () => ({ loading: true }),
      () => Employee.getAllWithCertifications()
        .then(res => this.setState({
          employeesCerts: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  public componentDidMount() {
    this.fetchAndStoreEmployeesCerts();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.empCount < prevProps.empCount) {
      this.fetchAndStoreEmployeesCerts();
    }
  }

  public handleOpenNew = () => {
    this.setState({ openModal: true });
  }

  public handleClose = () => {
    this.setState({ openModal: false });
  }

  public render() {
    const { classes, theme } = this.props;
    const { loading, employeesCerts } = this.state;

    const employeesAndCerts = employeesCerts.map((empCert: IEmployeeCertification) => {
      return (
        <TableRow key={`${empCert.full_name}${empCert.title}`}>
          <TableCell>{empCert.full_name}</TableCell>
          <TableCell>{empCert.title}</TableCell>
          <TableCell>{TimeUtil.formatDate(empCert.certification_date)}</TableCell>
        </TableRow>
      );
    });

    return (
      <React.Fragment>
        <Typography variant="h6" style={{ marginTop: theme.spacing.unit * 3 }}>
          Employees by Certification
          </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add Certification For Employee
          </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Certification Title</TableCell>
                  <TableCell>Certification Date</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesAndCerts}
              </TableBody>
            </Table>)}
        </Paper>
        {this.state.openModal && <EmpCertForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          refreshTable={this.fetchAndStoreEmployeesCerts}
        />}
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles, { withTheme: true })(EmpCertManagement);
