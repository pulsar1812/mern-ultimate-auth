import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuth } from '../auth/helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth() ? <Redirect to='/signin' /> : <Component {...props} />
    }
  />
);

export default PrivateRoute;
