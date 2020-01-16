import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Activity from "./Activity/Activity";
import Users from './Users/Users';
import Login from '../src/Auth/Login/Login';
import {MainLayout} from './shared/layouts/MainLayout/MainLayout';


interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const AuthenticatedRoute = ({component: Component, ...rest}: IProps)=> (
  <Route
     render={rest => 
      localStorage.getItem("email") ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

class App extends React.Component<any> {
  public render() {
      
    const users = [{name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}];
    const roles= [{name:'SYS_ADMIN'}, {name:'ADMIN'}, {name:'SOME_ROLE'}, {name:'ANOTHER_ROLE'}];
      return (
          <div className="app-routes">
              <Switch>
                  <AuthenticatedRoute path="/dashboard" component={Dashboard}/>
                  {/* <Route path="/dashboard" component={Dashboard} /> */}
                  <Route path="/activity" component={Activity} />
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
