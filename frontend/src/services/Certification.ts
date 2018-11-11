import axios, { AxiosPromise } from 'axios';
import ICertification from 'src/models/certification';
import IFormCertification from 'src/models/form-certification';

export default class Certification {
  public static getAll = (): AxiosPromise<ICertification[]> => {
    return axios.get('/api/certifications');
  }

  public static addOne = (certificationInfo: IFormCertification): AxiosPromise => {
    return axios.post('/api/certifications', certificationInfo);
  }
}
