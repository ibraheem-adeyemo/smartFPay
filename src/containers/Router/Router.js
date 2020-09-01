import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "../App/MainWrapper";

import {
  UserRoutes,
  LimitRequestRoutes,
  CustomerRoutes,
  AuditTrailRoutes,
  RolesRoutes,
  TransactionRoutes,
  TokenRoutes
} from "./routeConstants";
import Dashboard from "../Dashboard";
import PermissionedRoute from "./PermissionedRoute";
import LogIn from "../Account/LogIn";
import RoleForm from "../Roles/RolesForm";
import LimitForm from "../Limits/LimitForm";

const Users = () => (
  <Switch>
    {UserRoutes.enabled &&
      UserRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            path={route.path}
            allowedPermissions={route.permissions}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Roles = () => (
  <Switch>
    {RolesRoutes.enabled &&
      RolesRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            path={route.path}
            allowedPermissions={route.permissions}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Limits = () => (
  <Switch>
    {LimitRequestRoutes.enabled &&
      LimitRequestRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            allowedPermissions={route.permissions}
            path={route.path}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Reports = () => (
  <Switch>
    {AuditTrailRoutes.enabled &&
      AuditTrailRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            allowedPermissions={route.permissions}
            path={route.path}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Transactions = () => (
  <Switch>
    {TransactionRoutes.enabled &&
      TransactionRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            allowedPermissions={route.permissions}
            path={route.path}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Token = () => (
  <Switch>
    {TokenRoutes.enabled &&
      TokenRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            allowedPermissions={route.permissions}
            path={route.path}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Customers = () => (
  <Switch>
    {CustomerRoutes.enabled &&
      CustomerRoutes.routes.map(route =>
        route.enabled ? (
          <PermissionedRoute
            key={route.key}
            exact={route.exact}
            allowedPermissions={route.permissions}
            path={route.path}
            name={route.name}
            component={route.pageComponent}
          />
        ) : null
      )}
  </Switch>
);

const Router = ({ hasError }) => (
  <Switch>
    <MainWrapper hasError={hasError}>
      <main>
        <div>    
          {/* <Redirect exact from="/" to="/pc/signin" /> */}
          <Route exact path="/pc/signin" component={LogIn} />
            <>
          {window.location.pathname.slice(-10) !== "/pc/signin" && <Layout />}
          <div className={window.location.pathname.slice(-10) !== "/pc/signin" ?"container__wrap" : ""}>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={Users} />
            <Route path="/customers" component={Customers} />
            <Route path="/limit-requests" component={Limits} />
            {/* <Route path="/report" component={Reports} /> */}
            <Route path="/view-report" component={Reports} />
            <Route path="/roles" component={Roles} />
            <Route path="/view-transactions" component={Transactions} />
            <Route path="/channel-token" component={Token} />
          </div>
          </>
        </div>
      </main>
    </MainWrapper>
  </Switch>
);

console.log(localStorage.getItem('pc-token'), window.location.pathname.slice(-10));

export default Router;
