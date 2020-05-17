import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: '',
    buttonText: 'Request Password Reset Link',
  });

  const { email, buttonText } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Requesting' });

    const data = { email };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/auth/forgot-password`,
        data,
        config
      );

      console.log('Forgot Password Success', res);
      toast.success(res.data.message);
      setFormData({ ...formData, buttonText: 'Requested' });
    } catch (err) {
      console.log('Forgot Password Error', err.response.data);
      toast.error(err.response.data.error);
      setFormData({ ...formData, buttonText: 'Request Password Reset Link' });
    }
  };

  const passwordForgotForm = () => (
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
      <h1 className='p-5 text-center'>Forgot Password</h1>
      {passwordForgotForm()}
    </div>
  );
};

export default Forgot;
