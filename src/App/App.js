import './App.css';
import Logout from 'components/Logout';
import Login from 'components/Login';
import SignUp from 'components/SignUp';

import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import Home from 'components/Home/Home';
import DashboardLayout from 'Layouts/Dashboard.layout';

const App = () => {
  const { token, user } = useContext(AuthContext);
  return (
    <div className='App'>
      {token ? (
        <>
          {user ? (
            <>
              <DashboardLayout
                exact
                path='/'
                component={Home}
                posts={[]}
                categories={[]}
                users={[]}
              />
              <Route exact path='/logout' component={Logout} />
              <Redirect to='/' />
            </>
          ) : (
            <div className='loader'></div>
          )}
        </>
      ) : (
        <>
          {/* <Route component={Navbar} /> */}
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signUp' component={SignUp} />
            <Redirect to='/login' />
          </Switch>
          {/* <Route component={Footer} /> */}
        </>
      )}
    </div>
  );
};

export default App;
