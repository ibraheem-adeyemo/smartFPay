import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Activity from "./Activity/Activity";

class App extends React.Component<any> {
  public render() {
      return (
          <div className="App-routes container-fluid">
              <Switch>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/activity" component={Activity} />
              </Switch>
          </div>
      );
  }
}
export default withRouter(App);
