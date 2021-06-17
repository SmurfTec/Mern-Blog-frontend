import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import Navbar from 'components/common/Navbar';
import Footer from 'components/common/Footer';
import { AuthContext } from 'contexts/AuthContext';
import { Box } from '@material-ui/core';

const DashboardLayout = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar user={user} />
      <Route {...rest} component={Component} />
      <Box minHeight={100} width={'100%'}></Box>
      <Footer />
    </>
  );
};

export default DashboardLayout;
