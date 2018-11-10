export default interface IJob {
  id: number;
  train_id: number | null;
  engineer: any | null;
  conductor: any | null;
  assistant_conductor: any | null;
  start_station: string;
  end_station: string;
  signup_time: string;
  signoff_time: string;
}