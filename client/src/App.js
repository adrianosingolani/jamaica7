import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import UserSettings from './pages/UserSettings/UserSettings';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SelectedRecord from './pages/SelectedRecord/SelectedRecord';

import { checkAuth } from './store/actions/authActions';

export const App = ({ auth, checkAuth }) => {
  useEffect(() => {
    if (!auth.authenticated) {
      checkAuth();
    }
  }, [auth.authenticated, checkAuth]);

  return (
    <div className="App">
      <Router>
        <Layout>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/notfound" component={NotFound} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/confirmemail/:token" component={ConfirmEmail} />
              <Route exact path="/changepassword/:token" component={ChangePassword} />
              <ProtectedRoute path="/usersettings" component={UserSettings} />
              <Route exact path="/record/:recordid" component={SelectedRecord} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
        </Layout>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  checkAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);