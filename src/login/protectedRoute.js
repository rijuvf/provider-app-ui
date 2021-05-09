import React from 'react';
import { Route } from 'react-router-dom';
import { useLoginContext } from './loginContext';
import Login from '../appbar/AppBar';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component, ...rest }) => {
  const loginContext = useLoginContext();
  console.log(`protected route email-----${loginContext.email}`);
  // eslint-disable-next-line no-undef
  console.log(`protected route component-----${component}`);
  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      component={loginContext.email === 'true' ? component : Login}
    />
  );
};

export default ProtectedRoute;
