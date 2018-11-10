// TODO: remove any
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string;
  primary: string;
  icon?: any;
}

class ListItemLink extends React.Component<IProps> {
  public renderLink = (itemProps: any) => <Link to={this.props.to} {...itemProps} />;

  public render() {
    const { icon, primary } = this.props;

    return (
      <ListItem button={true} component={this.renderLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset={true} primary={primary} />
      </ListItem>
    );
  }
}

export default ListItemLink;