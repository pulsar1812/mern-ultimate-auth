import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { isAuth, getCookie, signOut } from './auth/helpers';

const Dashboard = ({ history }) => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit',
  });

  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const url = `${process.env.REACT_APP_API}/user/${isAuth()._id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(url, config);

      console.log('Profile Update', response);
      const { role, name, email } = response.data;
      setFormData({ ...formData, role, name, email });
    } catch (err) {
      console.log('Profile Update Error', err.response.data.error);
      if (err.response.status === 401) {
        signOut(() => {
          history.push('/');
        });
      }
    }
  };

  const { role, name, email, password, buttonText } = formData;

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

    const body = JSON.stringify({ name, password });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/user`,
        body,
        config
      );

      console.log('Signup Success', response);
      setFormData({
        ...formData,
        role: '',
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

  const updateForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          type='text'
          name='role'
          value={role}
          className='form-control'
          readOnly
        />
      </div>

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
          readOnly
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
      <h1 className='pt-5 text-center'>Dashboard</h1>
      <p className='lead text-center'>Profile Update</p>
      {updateForm()}
    </div>
  );
};

export default Dashboard;
