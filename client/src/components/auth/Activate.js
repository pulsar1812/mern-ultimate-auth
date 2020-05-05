import React, { useState, useEffect } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  });

  useEffect(() => {
    console.log('activate activate activate');
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({ token });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/account-activation`,
        data,
        config
      );

      console.log('Activation Success', response);
      setValues({
        ...values,
        token: '',
        show: false,
      });
      toast.success(response.data.message);
    } catch (err) {
      console.log('Activation Error', err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  const activationLink = () => (
    <div className='text-center'>
      <h1 className='p-5'>
        Hi {name}, are you ready to activate your account?
      </h1>
      <button className='btn btn-outline-primary' onClick={handleSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <div className='col-md-6 offset-md-3'>
      <ToastContainer />
      {activationLink()}
    </div>
  );
};

export default Activate;
