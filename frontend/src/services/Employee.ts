import axios, { AxiosPromise } from 'axios';
import IEmployee from 'src/models/employee';
import IFormEmployee from 'src/models/employee-form';

export default class Employee {
  public static getEmployees = (): AxiosPromise<IEmployee[]> => {
    return axios.get('/api/employees');
  }

  public static saveNewEmployee = (employeeInfo: IFormEmployee): AxiosPromise => {
    return axios.post('/api/employees', employeeInfo);
  }

  public static deleteEmployee = (empID: string): AxiosPromise => {
    return axios.delete(`/api/employees/${empID}`);
  }
}