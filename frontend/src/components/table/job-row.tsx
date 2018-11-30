import { Button, TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';

import IJob from 'src/models/job';
import TimeUtil from 'src/utils/time';

interface IProps extends IJob {
  manageView?: boolean;
  handleDelete?: (jobID: string) => void;
  handleEdit?: (jobID: string) => void;
  id: string,
  train_id: any,
  engineer: any,
  conductor: any,
  assistant_conductor: any,
  start_station: string,
  end_station: string,
}

class TableJobRow extends React.PureComponent<IProps, {}> {
  private signupTime = TimeUtil.formatHours(this.props.signup_time);
  private signoffTime = TimeUtil.formatHours(this.props.signoff_time);

  public handleEdit = () => {
    if (this.props.handleEdit) {
      this.props.handleEdit(this.props.id);
    }
  }

  public handleDelete = () => {
    if (this.props.handleDelete === undefined) {
      return;
    }

    this.props.handleDelete(this.props.id);
  }

  public render() {
    const { id, train_id, engineer, conductor, assistant_conductor, start_station, end_station, manageView } = this.props;

    return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{train_id === null ? 'BLANK' : train_id}</TableCell>
        <TableCell>
          {engineer.fname === null ? 'BLANK' : `${engineer.fname} ${engineer.lname}`}
        </TableCell>
        <TableCell>
          {conductor.fname === null ? 'BLANK' : `${conductor.fname} ${conductor.lname}`}
        </TableCell>
        <TableCell>
          {assistant_conductor.fname === null ? 'BLANK' : `${assistant_conductor.fname} ${assistant_conductor.lname}`}
        </TableCell>
        <TableCell>{start_station}</TableCell>
        <TableCell>{end_station}</TableCell>
        <TableCell>{this.signupTime}</TableCell>
        <TableCell>{this.signoffTime}</TableCell>
        {manageView && (
          <TableCell>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.handleEdit}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDelete}
            >
              Remove
            </Button>
          </TableCell>
        )}
      </TableRow>
    );
  }
}

export default TableJobRow;
