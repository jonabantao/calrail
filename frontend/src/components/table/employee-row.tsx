import { Button, TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';

import IEmployee from 'src/models/employee';
import TimeUtil from 'src/utils/time';

interface IProps extends IEmployee {
  handleEdit: (empID: string) => void;
  handleDelete: (empID: string) => void;
}

class TableEmployeeRow extends React.PureComponent<IProps, {}> {
  public startDate = TimeUtil.formatDate(this.props.start_date);

  public handleEdit = () => {
    this.props.handleEdit(this.props.id);
  }

  public handleDelete = () => {
    this.props.handleDelete(this.props.id);
  }
  
  public render () {
    const { id, fname, lname, homebase } = this.props;

    return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{fname}</TableCell>
        <TableCell>{lname}</TableCell>
        <TableCell>{homebase}</TableCell>
        <TableCell>{this.startDate}</TableCell>
        <TableCell>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleEdit}
            style={{ marginRight: 16 }}
          >
            Edit
            </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleDelete}
          >
            Fire
            </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default TableEmployeeRow;
