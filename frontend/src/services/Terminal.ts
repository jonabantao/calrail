import axios, { AxiosPromise } from 'axios';
import ITerminal from 'src/models/terminal';

export default class Terminal {
  public static getAll = (): AxiosPromise<ITerminal[]> => {
    return axios.get('/api/terminals');
  }
}