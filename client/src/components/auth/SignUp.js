import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/signup`,
        body,
        config
      );

      console.log('Signup Success', response);
      setFormData({
        ...formData,
        name: '',
        email: '',
        password: '',
        buttonText: 'Submitted',
      });
      toast.success(response.data.message);
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
      <h1 className='p-5 text-center'>SignUp</h1>
      {signupForm()}
    </div>
  );
};

export default SignUp;
