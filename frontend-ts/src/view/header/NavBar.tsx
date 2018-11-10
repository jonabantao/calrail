import { 
  AppBar,
  Collapse,
  Drawer,
  IconButton,
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import WorkIcon from '@material-ui/icons/Train';
import * as React from 'react';

import ListItemLink from '../../components/list/ListItemLink';


const styles = ({ spacing, mixins, zIndex }: Theme) => ({
  appBar: {
    zIndex: zIndex.drawer + 1,
  },
  drawer: {
    drawerWidth: spacing.unit * 30,
    flexShrink: 0,
  },
  drawerPaper: {
    width: spacing.unit * 30
  },
  nested: {
    padingLeft: spacing.unit * 4,
  },
  toolbar: mixins.toolbar,
});

interface IProps extends WithStyles<typeof styles> {
  drawerOpen: boolean,
  subdrawerOpen: boolean,
  handleDrawerToggle: () => void,
  handleSubdrawerToggle: () => void,
}

const NavBar: React.SFC<IProps> = ({ 
  classes,
  drawerOpen,
  subdrawerOpen,
  handleDrawerToggle,
  handleSubdrawerToggle
}) => {

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
          >
            {drawerOpen ? <LeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap={true}>
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
          <ListItemLink to="/" primary="Current Jobs" icon={<WorkIcon />} />
          <ListItem button={true} onClick={handleSubdrawerToggle}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Management" />
            {subdrawerOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={subdrawerOpen} timeout="auto" unmountOnExit={true}>
            <List component="div" disablePadding={true}>
              <ListItemLink to="/jobs" primary="Jobs" />
              <ListItemLink to="/employees" primary="Employees" />
              <ListItemLink to="/trains" primary="Trains" />
              <ListItemLink to="/terminals" primary="Terminals" />
              <ListItemLink to="/certifications" primary="Certifications" />
            </List>
          </Collapse>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default withStyles(styles)(NavBar);