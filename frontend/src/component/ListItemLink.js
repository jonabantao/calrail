import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class ListItemLink extends Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;

    return (
      <ListItem button component={this.renderLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText inset primary={primary} />
      </ListItem>
    );
  }
}

export default ListItemLink;