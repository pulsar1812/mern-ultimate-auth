import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };

  const nav = () => (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link to='/' className='nav-link' style={isActive('/')}>
          Home / {JSON.stringify(match)}
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/signin' className='nav-link' style={isActive('/signin')}>
          Sign In
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/signup' className='nav-link' style={isActive('/signup')}>
          Sign Up
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className='container'>{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
