import React from 'react';
import logo from './logo.svg';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component<any> {
  public render() {
      return (
          <div className="App-routes">
              <Switch>
                  <Route path="/dashboard" component={Dashboard}/>
              </Switch>
          </div>
      );
  }
}
export default withRouter(App);
