import axios, { AxiosPromise } from 'axios';
import IEmployee from 'src/models/employee';
import IEmployeeCertification from 'src/models/employee-cert';
import IFormEmployee from 'src/models/form-employee';

export default class Employee {
  public static getOne = (empID: string) => {
    return axios.get(`/api/employees/${empID}`);
  }

  public static getAll = (): AxiosPromise<IEmployee[]> => {
    return axios.get('/api/employees');
  }

  public static getAllWithCertifications = (): AxiosPromise<IEmployeeCertification[]> => {
    return axios.get('/api/employees/certifications');
  }

  public static addOne = (employeeInfo: IFormEmployee): AxiosPromise => {
    return axios.post('/api/employees', employeeInfo);
  }

  public static deleteOne = (empID: string): AxiosPromise => {
    return axios.delete(`/api/employees/${empID}`);
  }

  public static deleteCertification = (empID: string, certID: string) => {
    return axios.delete(`/api/employees/${empID}/certifications/${certID}`);
  }

  public static updateOne = (empID: string, employeeInfo: IFormEmployee): AxiosPromise => {
    return axios.put(`/api/employees/${empID}`, employeeInfo);
  }
}