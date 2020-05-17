import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { isAuth } from './helpers';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const { name, email, password, buttonText } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Submitting' });

    const data = JSON.stringify({ name, email, password });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/signup`,
        data,
        config
      );

      console.log('Signup Success', res);
      setFormData({
        ...formData,
        name: '',
        email: '',
        password: '',
        buttonText: 'Submitted',
      });
      toast.success(res.data.message);
    } catch (err) {
      console.log('Signup Error', err.response.data);
      setFormData({ ...formData, buttonText: 'Submit' });
      toast.error(err.response.data.error);
    }
  };

  const signupForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          className='form-control'
          onChange={handleChange}
        />
      </div>

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
      <h1 className='p-5 text-center'>SignUp</h1>
      {signupForm()}
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

export default SignUp;
