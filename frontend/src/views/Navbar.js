import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import WorkIcon from '@material-ui/icons/Train';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import ListItemLink from '../component/list/ListItemLink';


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    drawerWidth: theme.spacing.unit * 30,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.spacing.unit * 30
  },
  nested: {
    padingLeft: theme.spacing.unit * 4,
  },
  toolbar: theme.mixins.toolbar,
});

class Navbar extends Component {
  render () {
    const { classes, drawerOpen, subdrawerOpen } = this.props

    return (
      <Fragment>
        <AppBar position="fixed" className={classes.appBar} >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={this.props.handleDrawerToggle}
            >
              {drawerOpen ? <LeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              CalRail
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItemLink to="/" primary="Current Jobs" icon={<WorkIcon />}/>
            <ListItem button onClick={this.props.handleSubdrawerToggle}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText inset primary="Management" />
              {subdrawerOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={subdrawerOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemLink to="/jobs" primary="Jobs" />
                <ListItemLink to="/employees" primary="Employees" />
                <ListItemLink to="/trains" primary="Trains" />
                <ListItemLink to="/terminals" primary="Terminals" />
                <ListItemLink to="/certifications" primary="Certifications" />
              </List>
            </Collapse>
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Navbar);