import * as moment from 'moment';

export default class TimeUtil {
  public static formatDate = (timeString: string) => {
    return moment(timeString).format('MM-DD-YYYY');
  }
  
  public static formatHours = (hourString: string) => {
    return moment(hourString, 'HH:mm:ss').format('HHmm');
  }
}
