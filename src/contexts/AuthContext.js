import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { handleCatch, makeReq } from 'utils/constants';

export const AuthContext = React.createContext();

export const AuthProvider = withRouter(({ children, history }) => {
  let tokenLocal;

  try {
    tokenLocal = window.localStorage.getItem('jwt');
  } catch (err) {
    tokenLocal = null;
  }

  const [token, setToken] = useState(tokenLocal);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    try {
      const res = await makeReq(`/users/me`, {}, 'GET');
      console.log(`res`, res);
      localStorage.setItem('user', JSON.stringify(res.user));

      setUser(res.user);
    } catch (err) {
      setToken(null);
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');

      console.log(`children`, children);
      console.log(`history`, history);
      // history.push('/');
    }
  };

  const signInUser = (tk, us) => {
    window.localStorage.setItem('jwt', tk);
    window.localStorage.setItem('user', us);

    setToken(tk);
    setUser(us);
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('jwt');

    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 1000);
  };

  const updatePass = async (passObj) => {
    console.log(`passObj`, passObj);
    try {
      const data = await makeReq(
        '/auth/updatePassword',
        { body: passObj },
        'PATCH'
      );

      console.log(`data`, data);

      toast.success('Password Updated Successfully');

      setTimeout(() => {
        signInUser(data.token, data.user);
      }, 500);
    } catch (err) {
      handleCatch(err);
    }
  };

  const updateMe = async (updatedObj) => {
    console.log(`updatedObj`, updatedObj);
    try {
      const data = await makeReq(
        '/users/me',
        { body: updatedObj },
        'PATCH'
      );

      console.log(`data`, data);
      setUser(data.user);
      toast.success('Profile Updated Successfully');
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        updateMe,
        setToken,
        logoutUser,
        user,
        setUser,
        signInUser,
        updatePass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
