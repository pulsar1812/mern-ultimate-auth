import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuth } from '../auth/helpers';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === 'admin' ? (
        <Component {...props} />
      ) : (
        <Redirect to='/signin' />
      )
    }
  />
);

export default AdminRoute;
