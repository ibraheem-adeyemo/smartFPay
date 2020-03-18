import UsersList from "../Users/UsersList";
import UserRoleForm from "../Users/UserRoleForm";
import UserForm from "../Users/UserForm";
import ViewUser from "../Users/UserView";
import CardRequestsList from "../CardRequests/ViewAllCardRequests";
import CardRequestsForm from "../CardRequests/CardRequestsForm";
import ViewCardRequest from "../CardRequests/ViewCardRequest";

import BatchCustomersList from "../Customers/ViewBatchCustomers";
import CustomersList from "../Customers/ViewAllCustomers";
import CardsRecordsList from "../CardRecords/ViewAllCardRecords";

import { permissionsConstants } from "../../constants/permissions.constants";
import ViewCustomer from "../Customers/ViewCustomer";

const {
  CREATE_LIMIT,
  VIEW_LIMIT_REQUEST,
  VIEW_USERS,
  VIEW_USER,
  CREATE_USER,
  UPDATE_USER,
  CHANGE_USER_ROLE,
  VIEW_CUSTOMER,
  VIEW_CUSTOMER_CARDS,
} = permissionsConstants;

export const LimitRequestRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "limitRequests",
      title: "Limit Requests",
      exact: true,
      icon: null,
      name: "LimitRequests",
      path: "/limit-requests",
      menu: true,
      pageComponent: CardRequestsList,
      enabled: true,
      permissions: [VIEW_LIMIT_REQUEST]
    },
    {
      key: "limitRequestCustomers",
      title: "Limit Request Customers Cards",
      exact: false,
      icon: null,
      name: "LimitRequestCustomers",
      path: "/card-requests/:id/customers",
      menu: true,
      pageComponent: BatchCustomersList,
      enabled: true,
      permissions: [VIEW_CUSTOMER]
    },
    {
      key: "createLimit",
      title: "Create Limit",
      exact: false,
      icon: null,
      name: "CreateLimit",
      path: "/Limit-requests/create",
      menu: true,
      pageComponent: CardRequestsForm,
      enabled: true,
      permissions: [CREATE_LIMIT]
    },
    {
      key: "viewCardRequest",
      title: "View Card Request",
      exact: false,
      icon: null,
      name: "ViewLimitRequest",
      path: "/limit-requests/view/:id",
      menu: true,
      pageComponent: ViewCardRequest,
      enabled: true,
      permissions: [VIEW_LIMIT_REQUEST]
    },
    {
      key: "viewRequestDetails",
      title: "View Request Details",
      exact: false,
      icon: null,
      name: "ViewRequestDetails",
      path: "/card-requests/customers/1",
      menu: true,
      pageComponent: ViewCardRequest,
      enabled: true,
      permissions: [VIEW_LIMIT_REQUEST]
    }
  ]
};

export const CustomerRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "customers",
      title: "Customers",
      exact: true,
      icon: null,
      name: "CardRequests",
      path: "/customers",
      menu: true,
      pageComponent: CustomersList,
      enabled: true,
      permissions: [VIEW_CUSTOMER]
    },
    {
      key: "customercards",
      title: "Customer Cards",
      exact: false,
      icon: null,
      name: "CustomerCards",
      path: "/customers/cards",
      menu: true,
      pageComponent: CardsRecordsList,
      enabled: true,
      permissions: [VIEW_CUSTOMER_CARDS]
    },
    {
      key: "editCustomers",
      title: "Edit Customers",
      exact: false,
      icon: null,
      name: "EditCustomers",
      path: "/customers/edit/:id",
      menu: true,
      pageComponent: ViewCardRequest,
      enabled: true,
      permissions: [VIEW_CUSTOMER]
    },
    {
      key: "viewCustomer",
      title: "View ",
      exact: false,
      icon: null,
      name: "ViewRequestDetails",
      path: "/customers/view/:id",
      menu: true,
      pageComponent: ViewCustomer,
      enabled: true,
      permissions: [VIEW_CUSTOMER]
    }
  ]
};

export const UserRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "users",
      title: "User Management",
      exact: true,
      icon: null,
      name: "Users",
      path: "/users",
      menu: true,
      pageComponent: UsersList,
      enabled: true,
      permissions: [VIEW_USERS]
    },
    {
      key: "addUser",
      title: "Add User",
      exact: false,
      icon: null,
      name: "Add Users",
      path: "/users/add",
      menu: false,
      pageComponent: UserForm,
      enabled: true,
      permissions: [CREATE_USER]
    },
    {
      key: "viewUser",
      title: "View User",
      exact: false,
      icon: null,
      name: "View User",
      path: "/users/view/:id",
      menu: false,
      pageComponent: ViewUser,
      enabled: true,
      permissions: [VIEW_USER]
    },
    {
      key: "editUser",
      title: "Edit User",
      exact: false,
      icon: null,
      name: "Edit Users",
      path: "/users/edit/:id",
      menu: false,
      pageComponent: UserForm,
      enabled: true,
      permissions: [UPDATE_USER]
    },
    {
      key: "manageUserRole",
      title: "Manage User Role",
      exact: false,
      icon: null,
      name: "Manage User Role",
      path: "/users/roles/:id",
      menu: false,
      pageComponent: UserRoleForm,
      enabled: true,
      permissions: [CHANGE_USER_ROLE]
    }
  ]
};
