import axios, { AxiosPromise } from 'axios';
import ITrain from 'src/models/train';

export default class Train {
  public static getAll = (): AxiosPromise<ITrain[]> => {
    return axios.get('/api/trains');
  }

  public static deleteOne = (trainID: string): AxiosPromise => {
    return axios.delete(`/api/trains/${trainID}`);
  }
}