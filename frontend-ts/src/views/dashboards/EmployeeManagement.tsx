import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import TableEmployeeRow from 'src/components/table/employee-row';
import CircularLoader from 'src/components/ui-loader/CircularLoader';
import IEmployee from 'src/models/employee';
import Employee from 'src/services/Employee';
import dashboardStyles from 'src/styles/dashboard';
import EmpCertManagement from 'src/views/dashboards/EmpCertManagement';
import EmployeeForm from 'src/views/forms/EmployeeForm';


interface IProps extends WithStyles<typeof dashboardStyles> { }

interface IState {
  employeeID: string | undefined,
  employees: IEmployee[],
  loading: boolean,
  newForm: boolean,
  openModal: boolean,
}

class EmployeeManagement extends React.Component<IProps, IState> {
  public readonly state = {
    employeeID: undefined,
    employees: [],
    loading: false,
    newForm: true,
    openModal: false,
  };

  public fetchAndStoreEmployees = () => {
    this.setState(
      () => ({ loading: true }),
      () => Employee.getEmployees()
        .then(res => this.setState({
          employees: res.data,
          loading: false,
        }))
        .catch(() => this.setState({ loading: false }))
    );
  }

  public componentDidMount() {
    this.fetchAndStoreEmployees();
  }

  public handleOpenNew = () => {
    this.setState({
      newForm: true,
      openModal: true,
    });
  }

  public handleDelete = (empID: string) => {
    Employee.deleteEmployee(empID)
      .then(this.fetchAndStoreEmployees)
      .catch(() => {
        if (this.state.loading) {
          this.setState({ loading: false });
        }
      })
  }

  public handleEdit = (empID: string) => {
    alert('Under construction!');
  }

  public handleClose = () => {
    this.setState({ openModal: false });
  }

  public render() {
    const { classes } = this.props;
    const { employees, loading, newForm } = this.state;
    const employeeCount = this.state.employees.length;

    const employeeRows = employees.map((employee: IEmployee) => {
      return (
        <TableEmployeeRow
          key={employee.id}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          {...employee}
        />
      );
    })

    return (
      <React.Fragment>
        <Typography variant="h5">Employee Management</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={this.handleOpenNew}
        >
          <AddIcon className={classes.iconRight} />
          Add Employee
        </Button>
        <Paper className={classes.root}>
          {loading ? <CircularLoader /> : (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Homebase</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeRows}
              </TableBody>
            </Table>)}
        </Paper>
        <EmployeeForm
          open={this.state.openModal}
          handleClose={this.handleClose}
          newForm={newForm}
          refreshTable={this.fetchAndStoreEmployees}
        />
        <EmpCertManagement
          empCount={employeeCount}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(dashboardStyles)(EmployeeManagement);
