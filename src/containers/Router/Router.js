import React from "react";
import { Route, Switch /* Redirect */ } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "../App/MainWrapper";

import {
  UserRoutes,
  LimitRequestRoutes,
  CustomerRoutes,
  AuditTrailRoutes,
  RolesRoutes
} from "./routeConstants";
import Dashboard from "../Dashboard";
import PermissionedRoute from "./PermissionedRoute";
import LogIn from "../Account/LogIn";
import RoleForm from "../Roles/RolesForm";

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
    <Route exact path="/" component={LogIn} />
    <Route path="/login" component={LogIn} />
    <MainWrapper hasError={hasError}>
      <main>
        <div>
          <Layout />
          <div className="container__wrap">
            
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={Users} />
            <Route path="/customers" component={Customers} />
            <Route path="/limits" component={Limits} />
            <Route path="/report" component={Reports} />
            <Route path="/view-report" component={Reports} />
            <Route path="/roles" component={Roles} />
            <Route path="/roles-form" component={RoleForm} />
            {/* <PermissionedRoute
              path="/admin-management"
              allowedPermissions={[permissionsConstants.VIEW_CARD_STATEMENT]}
              name="Admin Management"
              component={CardStatement}
            /> */}
          </div>
        </div>
      </main>
    </MainWrapper>
  </Switch>
);

export default Router;
