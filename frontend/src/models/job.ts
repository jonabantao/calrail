import IEmployee from './employee';

export default interface IJob extends IEmployee {
  id: string;
  train_id: string | null;
  engineer: IEmployee;
  conductor: IEmployee;
  assistant_conductor: IEmployee;
  start_station: string;
  end_station: string;
  signup_time: string;
  signoff_time: string;
}