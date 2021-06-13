import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import { AuthContext } from 'contexts/AuthContext';

const DashboardLayout = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar user={user} />
      <Route {...rest} component={Component} />
      <Footer />
    </>
  );
};

export default DashboardLayout;
