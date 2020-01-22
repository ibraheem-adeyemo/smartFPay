import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Activity from "./Activity/Activity";
import ChangePassword from '../src/Auth/ChangePassword/ChangePassword';
import SetPassword from '../src/Auth/SetPassword/SetPassword';
import Users from './Users/Users';
import Login from '../src/Auth/Login/Login';
import {MainLayout} from './shared/layouts/MainLayout/MainLayout';
import AuthenticatedRoute from './shared/components/AuthenticatedRoute/AuthenticatedRoute';


class App extends React.Component<any> {
  public render() {
      
    const users = [{name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}];
    const roles= [{name:'SYS_ADMIN'}, {name:'ADMIN'}, {name:'SOME_ROLE'}, {name:'ANOTHER_ROLE'}];
      return (
          <div className="app-routes">
              <Switch>
                  <AuthenticatedRoute path="/dashboard" component={Dashboard}/>
                  <AuthenticatedRoute path="/change-password" component={ChangePassword}/>
                  <Route path="/set-password" component={SetPassword}/>
                  <AuthenticatedRoute path="/activity" component={Activity} />
                  <MainLayout path="/users" component={Users}  users={users} roles={roles}/>
                  <Route path="/login" component={Login} />
                  <Route>
                    <Login />
                  </Route>
              </Switch>
          </div>
      );
  }
}
export default withRouter(App);
