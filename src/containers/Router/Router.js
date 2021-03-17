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
import { connect } from "react-redux";

const Users = () => (
  <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Roles = () => (
  <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Limits = () => (
  <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Reports = () => (
  <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Transactions = () => (
  <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Token = () => ( <main>
  <div>
 <Layout />
 <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Customers = () => (
  <main>
    <div>
   <Layout />
   <div className="container__wrap">
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
  </div>
  </div>
  </main>
);

const Router = ({ hasError, currentUser, permissions }) => {
  const unAuth = !currentUser.response;

  return (
    <Switch>
      <MainWrapper hasError={hasError}>
            {unAuth && <Redirect exact from="/" to="/pc/signin" />}
            <Route exact path="/pc/signin" component={LogIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/customers" component={Customers} />
            <Route path="/users" component={Users} />
            <Route path="/limit-requests" component={Limits} />
            <Route path="/report" component={Reports} />
            <Route path="/view-report" component={Reports} />
            <Route path="/roles" component={Roles} />
            <Route path="/view-transactions" component={Transactions} />
            <Route path="/channel-token" component={Token} />
        {/* <main>
          <div>
              <>
            <Layout />
            <div className="container__wrap">
            </div>
            </>
          </div>
        </main> */}
      </MainWrapper>
    </Switch>
  );
}

export default connect(state => ({
  permissions: state.permissions,
  currentUser: state.currentUser,
  assignedIssuer: state.getIssuerDomainMapping
}))(Router);
