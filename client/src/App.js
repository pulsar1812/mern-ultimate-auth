import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Activate from './components/auth/Activate';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/auth/activate/:token' component={Activate} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <AdminRoute path='/admin' component={Admin} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
