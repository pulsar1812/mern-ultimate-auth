import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Facebook = ({ informParent }) => {
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/facebook-login`,
        { userID: response.userID, accessToken: response.accessToken }
      );

      console.log('Facebook Signin Success', res);
      informParent(res);
    } catch (err) {
      console.log('Facebook Signin Error', err.response);
    }
  };

  return (
    <div className='pb-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className='btn btn-primary btn-lg btn-block'
          >
            <i className='fab fa-facebook pr-2'></i> Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
