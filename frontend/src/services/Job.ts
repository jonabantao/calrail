import axios, { AxiosPromise } from 'axios';
import IJob from 'src/models/job';

export default class Job {
  public static getAll = (): AxiosPromise<IJob[]> => {
    return axios.get('/api/jobs');
  }

  public static deleteOne = (jobID: string): AxiosPromise => {
    return axios.delete(`/api/jobs/${jobID}`);
  }
}