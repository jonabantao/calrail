import axios, { AxiosPromise } from 'axios';
import IJob from 'src/models/job';

export default class Job {
  public static getJobs = (): AxiosPromise<IJob[]> => {
    return axios.get('/api/jobs');
  }
}