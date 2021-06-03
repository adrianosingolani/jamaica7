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

import { loadUser } from './store/actions/authActions';

export const App = ({ auth, loadUser }) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      loadUser();
    }
  }, [auth.isAuthenticated, loadUser]);

  return (
    <div className="App">
      <Router>
        <Layout>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/notfound" component={NotFound} />
              <ProtectedRoute path="/usersettings" component={UserSettings} />
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
  loadUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);