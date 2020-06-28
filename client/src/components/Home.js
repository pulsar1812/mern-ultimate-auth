import React from 'react';
import { Redirect } from 'react-router-dom';

import { isAuth } from './auth/helpers';

const Home = () => {
  if (isAuth()) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='col-md-6 offset-md-3 text-center'>
      <h1 className='p-5'>React Node MongoDB Authentication Boilerplate</h1>
      <h2>MERN STACK</h2>
      <hr />
      <p className='lead'>
        MERN stack login register system with account activation, forgot
        password, reset password, login with Facebook and Google as well as
        private and protected routes for authenticated user and users with the
        role of admin.
      </p>
    </div>
  );
};

export default Home;
