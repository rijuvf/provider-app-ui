import React, { useState, useContext } from 'react';
import loginService from './loginService';
import usePersistedLocalState from './usePersistedLocalState';

const LoginContext = React.createContext();
const ONBOARDED_KEY = 'onboarding';
const initialState = {
  user: null,
};

const workspaceInitailState = {
  name: null,
};
const initvalues = {
  email: null,
  environment: 'ppe',
  isOnboarded: 'false',
  userName: '',
};

// eslint-disable-next-line react/prop-types
const LoginContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const [onboarded, setOnboarded] = usePersistedLocalState(
    ONBOARDED_KEY,
    initvalues
  );
  const [workspace, setWorkspace] = useState(workspaceInitailState);

  // eslint-disable-next-line no-unused-vars
  const setWorkspaces = data => {
    console.log('inside set workspaces  flow');
    setWorkspace({
      name: data,
    });
  };

  const login = () => {
    console.log('inside login authentication  flow');
    loginService
      .login()
      .then(async user => {
        setAuth({ user });
        // eslint-disable-next-line no-use-before-define
        authenticate(user.email, user.name);
        // eslint-disable-next-line no-use-before-define
        // authorize(user.email, user.name);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logout = () => {
    setOnboarded({
      isOnboarded: 'false',
      email: null,
      environment: null,
      userName: '',
    });

    loginService.logout();
  };

  /* useEffect(() => {
    loginService
      .getUserSilent()
      .then(async user => {
        setAuth({ user });
        // eslint-disable-next-line no-use-before-define
        authenticate(user.email, user.name);
        // eslint-disable-next-line no-use-before-define
        authorize(user.email, user.name);
      })
      .catch(error => {
        // nice catch!
        console.log(error);
      });
  }, []);
*/
  const getUser = () => {
    return loginService
      .getUserSilent()
      .then(async user => {
        setAuth({ user });
        // eslint-disable-next-line no-use-before-define
        authenticate(user.email, user.name);
        // eslint-disable-next-line no-use-before-define
        // authorize(user.email, user.name);
        return user;
      })
      .catch(error => {
        // nice catch!
        console.log(error);
      });
  };
  const authenticate = async (email, name) => {
    // const response = await loginService.authorize(email);
    if (email) {
      setOnboarded({
        isOnboarded: 'false',
        email,
        environment: 'na',
        userName: name,
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const authorize = async (email, name) => {
    console.log('Inside Authorize');
    const response = await loginService.authorize(email);
    console.log(response);
    console.log('inside authorize method');
    if (response && response.data) {
      setOnboarded({
        isOnboarded: 'true',
        email: response.data.email,
        environment: response.data.environmentAccess,
        userName: name,
      });
    }
  };

  return (
    <LoginContext.Provider
      value={{
        ...auth,
        ...onboarded,
        ...workspace,
        login,
        logout,
        getUser,
        setWorkspaces,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = LoginContextProvider;
