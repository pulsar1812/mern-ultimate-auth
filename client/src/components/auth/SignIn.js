import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { authenticate, isAuth } from './helpers';
import Google from './Google';
import Facebook from './Facebook';

const SignIn = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const { email, password, buttonText } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const informParent = (res) => {
    authenticate(res, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/dashboard');
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Submitting' });

    const data = JSON.stringify({ email, password });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/signin`,
        data,
        config
      );

      console.log('Signin Success', res);

      authenticate(res, () => {
        setFormData({
          ...formData,
          email: '',
          password: '',
          buttonText: 'Submitted',
        });
        // toast.success(`${response.data.user.name}, welcome back!`);
        isAuth() && isAuth().role === 'admin'
          ? history.push('/admin')
          : history.push('/dashboard');
      });
    } catch (err) {
      console.log('Signin Error', err.response.data);
      setFormData({ ...formData, buttonText: 'Submit' });
      toast.error(err.response.data.error);
    }
  };

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          className='form-control'
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          className='form-control'
          onChange={handleChange}
        />
      </div>

      <div>
        <button className='btn btn-primary' onClick={handleSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div className='col-md-6 offset-md-3'>
      <ToastContainer />
      {isAuth() ? <Redirect to='/dashboard' /> : null}
      <h1 className='p-5 text-center'>SignIn</h1>
      <Google informParent={informParent} />
      <Facebook informParent={informParent} />
      {signinForm()}
      <br />
      <Link
        to='/auth/password/forgot'
        className='btn btn-sm btn-outline-danger'
      >
        Forgot Password
      </Link>
    </div>
  );
};

export default SignIn;
