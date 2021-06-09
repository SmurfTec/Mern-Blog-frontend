import './App.css';
import Logout from 'components/Logout';
import Login from 'components/Login';
import SignUp from 'components/SignUp';

import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <div className='App'>
      {token ? (
        <>
          <Route exact path='/' render={() => <h1>HOME</h1>} />
          <Route exact path='/logout' component={Logout} />
          <Redirect to='/' />
        </>
      ) : (
        <>
          {/* <Route component={Navbar} /> */}
          <Switch>
            <Route exact path='/' render={() => <h1>HOME</h1>} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/signUp' component={SignUp} />
            <Redirect to='/' />
          </Switch>
          {/* <Route component={Footer} /> */}
        </>
      )}
    </div>
  );
};

export default App;
