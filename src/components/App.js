import React from 'react'
import Signup from "./signin/Signup"
import Dashboard from "./Dashboard"
import Login from './signin/Login'
import UpdateProfile from './signin/UpdateProfile'
import PrivateRoute from './signin/PrivateRoute'
import ForgotPassword from './signin/ForgotPassword'
import CardList from './cards/CardList'

import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../App.css'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/deck/:id" component={CardList} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
