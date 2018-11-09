import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, createStyles, MuiThemeProvider, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
  }
})

const styles = createStyles({
  root: {
    display: 'flex',
  }
});

interface IState {
  drawerOpen: boolean,
  subdrawerOpen: boolean,
}

interface IProps extends WithStyles<typeof styles> {

}

class App extends React.Component<IProps, IState> {
  public state: IState = {
    drawerOpen: true,
    subdrawerOpen: true,
  }

  public handleDrawerToggle = (): void => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  }

  public handleSubdrawerToggle = (): void => {
    this.setState(state => ({ subdrawerOpen: !state.drawerOpen }));
  }

  public render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <main className={classes.root}>
            <CssBaseline />
            <div className={classes.root}>hey</div>
          </main>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);