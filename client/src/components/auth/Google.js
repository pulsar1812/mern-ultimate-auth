import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = ({ informParent }) => {
  const responseGoogle = async (response) => {
    console.log(response.tokenId);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/google-login`,
        { idToken: response.tokenId }
      );

      console.log('Google Signin Success', res);
      informParent(res);
    } catch (err) {
      console.log('Google Signin Error', err.response);
    }
  };

  return (
    <div className='pb-3'>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-danger btn-lg btn-block'
          >
            <i className='fab fa-google pr-2'></i> Login with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Google;
