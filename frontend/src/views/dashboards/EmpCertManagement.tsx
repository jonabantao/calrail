import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';

import CircularLoader from 'src/components/ui-loader/CircularLoader';
import IEmployeeCertification from 'src/models/employee-cert';
import Employee from 'src/services/Employee';
import Job from 'src/services/Job';
import TimeUtil from 'src/utils/time';
import EmpCertForm from 'src/views/forms/EmpCertForm';

import dashboardStyles from 'src/styles/dashboard';


interface IProps extends WithStyles<typeof dashboardStyles> {
  empCount: number;
  theme: Theme;
  loading: boolean;
}

interface IState {
  certList: string[],
  certTitle: string;
  employeeID: number | null;
  employeesCerts: any;
  loading: boolean;
  openModal: boolean;
  filteredCerts: IEmployeeCertification[],
}

class EmpCertManagement extends React.Component<IProps, IState> {
  public readonly state = {
    certList: [],
    certTitle: '',
    employeeID: null,
    employeesCerts: [],
    filteredCerts: [],
    loading: false,
    openModal: false,
  };

  public fetchAndStoreEmployeesCerts = () => {
    this.setState(
      () => ({ loading: true }),
      () => Employee.getAllWithCertifications()
        .then(res => {
          const employeeCerts = res.data;
          let certTitles = employeeCerts.map(d => d.title);
          certTitles = Array.from(new Set(certTitles));
  
          this.setState({
            certList: certTitles,
            employeesCerts: employeeCerts,
            filteredCerts: employeeCerts,
            loading: false,
          });
        })
        .catch(() => this.setState({ loading: false }))
    );
  }

  public componentDidMount() {
    this.fetchAndStoreEmployeesCerts();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.loading && this.props.loading !== prevProps.loading) {
      this.fetchAndStoreEmployeesCerts();
    }
  }

  public handleOpenNew = () => {
    this.setState({ openModal: true });
  }

  public handleClose = () => {
    this.setState({ openModal: false });
  }

  public handleDelete = (empID : string, certID: string, certTitle: string) => () => {
    Employee.deleteCertification(empID, certID)
      .then((): any => {
        if (certTitle === 'Conductor') {
          return Job.removeConductorById(empID);
        } else if (certTitle === 'Engineer') {
          return Job.removeEngineerById(empID);
        }

        return;
      })
      .then(this.fetchAndStoreEmployeesCerts)
      .catch();
  }

  public handleFilterByTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const certTitle = e.target.value;

    this.setState(
      () => ({ loading: true }),
      () => Employee.findWithCertificationsByTitle(certTitle)
        .then(({ data }) => {
          this.setState({ certTitle, filteredCerts: data, loading: false });
        })
    );
  }

  public render() {
    const { classes, theme } = this.props;
    const { loading, filteredCerts, certList } = this.state;


    const certListDropdown = certList.map((title: string) => {
      return (
        <MenuItem key={title} value={title}>
          {title}
        </MenuItem>
      );
    });

    const employeesAndCerts = filteredCerts.map((empCert: IEmployeeCertification) => {
      return (
        <TableRow key={`${empCert.full_name}${empCert.title}`}>
          <TableCell>{empCert.full_name}</TableCell>
          <TableCell>{empCert.title}</TableCell>
          <TableCell>{TimeUtil.formatDate(empCert.certification_date)}</TableCell>
          <TableCell>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDelete(empCert.employee_id, empCert.certification_id, empCert.title)}
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      );
    });

    const defaultCertText = certList.length ? 'Select a Certification' : 'No employees with certifications found';

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
        <TextField
          select={true}
          label="Filter by Certification"
          value={this.state.certTitle}
          onChange={this.handleFilterByTitle}
          style={{ minWidth: 300, marginLeft: 16 }}
          variant="filled"
        >
          <MenuItem value=""><em>{defaultCertText}</em></MenuItem>
          {certListDropdown}
        </TextField>
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
