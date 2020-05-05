import cookie from 'js-cookie';

// Set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// Remove from cookie
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key);
  }
};

// Get from cookie such as stored token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// Set in localStorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localStorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and localStorage during signin
export const authenticate = (res, next) => {
  console.log('Authenticate helper on signin response', res);
  setCookie('token', res.data.token);
  setLocalStorage('user', res.data.user);

  next();
};

// Access user info from localStorage
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

// Sign Out
export const signOut = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

// Update User
export const updateUser = (res, next) => {
  console.log('Update User in localStorage', res);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = res.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};
