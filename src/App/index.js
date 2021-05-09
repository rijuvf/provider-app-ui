import React from 'react';
// eslint-disable-next-line no-unused-vars
import corejs from 'core-js/stable';
// eslint-disable-next-line no-unused-vars
import runtime from 'regenerator-runtime/runtime';

import {
  StateMachineProvider,
  createStore,
} from 'little-state-machine';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
// eslint-disable-next-line import/extensions
import { LoginProvider } from '../login/loginContext';
import ViewWorkspaces from '../workspaces/ViewWorkspaces';
import ViewApis from '../manageapis/ViewApis';
import ViewUsers from '../manageusers/ViewUsers';
import { APIS, WORKSPACE, USERS } from '../common/constants';
import NavBar from '../appbar/AppBar';
// eslint-disable-next-line react/prop-types
createStore({
  data: {},
});

const theme = createMuiTheme({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        h8: 'h8',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
    },
  },
  palette: {
    primary: {
      // Ikea Blue Color
      main: '#0058a3',
      dark: '#0f3d64',
      light: '#0480e9',
    },
    secondary: {
      main: '#FFF',
      dark: '#eee',
      light: '#FFF',
    },
    default: {
      main: '#eee',
    },
    white: '#FFF',
  },
  typography: {
    fontFamily: 'Noto IKEA',
  },
});

const App = () => (
  <LoginProvider>
    <ThemeProvider theme={theme}>
      <StateMachineProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route
              path={WORKSPACE}
              exact
              component={ViewWorkspaces}
            />
          </Switch>
          <Switch>
            <Route path={APIS} exact component={ViewApis} />
            <Route path={USERS} exact component={ViewUsers} />
          </Switch>
        </Router>
      </StateMachineProvider>
    </ThemeProvider>
  </LoginProvider>
);

export default App;
