import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Activity from "./Activity/Activity";
import Users from './Users/Users';
import {MainLayout} from './shared/layouts/MainLayout/MainLayout';

class App extends React.Component<any> {
  public render() {
      
    const users = [{name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}];
    const roles= [{name:'SYS_ADMIN'}, {name:'ADMIN'}, {name:'SOME_ROLE'}, {name:'ANOTHER_ROLE'}];
      return (
          <div className="App-routes">
              <Switch>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/activity" component={Activity} />
                  <MainLayout path="/users" component={Users}  users={users} roles={roles}/>
              </Switch>
          </div>
      );
  }
}
export default withRouter(App);
