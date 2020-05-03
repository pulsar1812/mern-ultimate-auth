import React from 'react';
import { Redirect } from 'react-router-dom';

import { isAuth } from './auth/helpers';

const Home = () => {
  if (isAuth()) {
    return <Redirect to='/dashboard' />;
  }

  return <div>MERN Ultimate Auth</div>;
};

export default Home;
