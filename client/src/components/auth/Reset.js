import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset Password',
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: 'Resetting' });

    const data = { resetPasswordLink: token, newPassword };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/auth/reset-password`,
        data,
        config
      );

      console.log('Reset Password Success', res);
      toast.success(res.data.message);
      setFormData({ ...formData, buttonText: 'Password Reset Done' });
    } catch (err) {
      console.log('Reset Password Error', err.response.data);
      toast.error(err.response.data.error);
      setFormData({ ...formData, buttonText: 'Reset Password' });
    }
  };

  const passwordResetForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>New Password</label>
        <input
          type='password'
          name='newPassword'
          value={newPassword}
          className='form-control'
          onChange={handleChange}
          placeholder='Type New Password'
          required
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
      <h1 className='p-5 text-center'>Hi {name}, type your new password</h1>
      {passwordResetForm()}
    </div>
  );
};

export default Reset;
