import UsersList from "../Users/UsersList";
import UserRoleForm from "../Users/UserRoleForm";
import UserForm from "../Users/UserForm";
import ViewUser from "../Users/UserView";
import CardRequestsList from "../CardRequests/ViewAllCardRequests";
import CardRequestsForm from "../CardRequests/CardRequestsForm";
import ViewCardRequest from "../CardRequests/ViewCardRequest";

import BatchCustomersList from "../Customers/ViewBatchCustomers";
import CustomersList from "../Customers/ViewAllCustomers";
import CustomerForm from "../Customers/CustomerForm";
import CardsRecordsList from "../CardRecords/ViewAllCardRecords";

import { permissionsConstants } from "../../constants/permissions.constants";
import ViewCustomer from "../Customers/ViewCustomer";

import AuditTrail from "../AuditTrail/AuditList/index";
import Roles from "../Roles/RolesList/index";
import RoleForm from "../Roles/RolesForm";

import Transactions from "../Transactions/TransactionList/index";

import LimitsList from "../Limits/LimitsList";
import LimitForm from "../Limits/LimitForm";
import CardLimitForm from "../Limits/CardLimitForm";
import ViewLimit from "../Limits/LimitView";
import ViewRole from "../Roles/RoleView";

import ChannelTokenForm from "../Token/ChannelTokenForm";

const {
  CREATE_CONTROL,
  CREATE_CUSTOMER,
  CREATE_CARD_CONTROL,
  UPDATE_CARD_CONTROL,
  VIEW_CONTROLS,
  UPDATE_CONTROL,
  VIEW_CONTROL,
  VIEW_USERS,
  VIEW_USER,
  CREATE_USER,
  UPDATE_USER,
  CHANGE_USER_ROLE,
  VIEW_CUSTOMER,
  VIEW_CUSTOMER_CARDS,
  VIEW_ADMIN
} = permissionsConstants;

export const LimitRequestRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "limitRequests",
      title: "Limits Management",
      exact: true,
      icon: null,
      name: "LimitRequests",
      path: "/limit-requests",
      menu: true,
      pageComponent: LimitsList,
      enabled: true,
      permissions: [VIEW_CONTROLS]
    },
    {
      key: "addLimit",
      title: "Add Limit",
      exact: false,
      icon: null,
      name: "Add Limit",
      path: "/limit-requests/add",
      menu: false,
      pageComponent: LimitForm,
      enabled: true,
      permissions: [CREATE_CONTROL]
    },
    {
      key: "addCardLimit",
      title: "Add Card Limit",
      exact: false,
      icon: null,
      name: "Add Card Limit",
      path: "/limit-requests/card/add",
      menu: false,
      pageComponent: CardLimitForm,
      enabled: true,
      permissions: [CREATE_CARD_CONTROL]
    },
    {
      key: "editLimit",
      title: "Edit Limit",
      exact: false,
      icon: null,
      name: "Edit Limits",
      path: "/limit-requests/edit/:id",
      menu: false,
      pageComponent: LimitForm,
      enabled: true,
      permissions: [UPDATE_CONTROL]
    },
    {
      key: "editCardLimit",
      title: "Edit Card Limit",
      exact: false,
      icon: null,
      name: "Edit Card Limits",
      path: "/limit-requests/card/edit/:id",
      menu: false,
      pageComponent: CardLimitForm,
      enabled: true,
      permissions: [UPDATE_CARD_CONTROL]
    },
    {
      key: "viewLimitRequest",
      title: "View Limit Request",
      exact: false,
      icon: null,
      name: "ViewLimitRequest",
      path: "/limit-requests/view/:id",
      menu: true,
      pageComponent: ViewLimit,
      enabled: true,
      permissions: [VIEW_CONTROL]
    },
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
      name: "Customers",
      path: "/customers",
      menu: true,
      pageComponent: CustomersList,
      enabled: true,
      permissions: [VIEW_CUSTOMER]
    },
    {
      key: "addCustomer",
      title: "Add Customer",
      exact: false,
      icon: null,
      name: "Add Customer",
      path: "/customers/add",
      menu: false,
      pageComponent: CustomerForm,
      enabled: true,
      permissions: [CREATE_CUSTOMER]
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
    // {
    //   key: "editCustomers",
    //   title: "Edit Customers",
    //   exact: false,
    //   icon: null,
    //   name: "EditCustomers",
    //   path: "/customers/edit/:id",
    //   menu: true,
    //   pageComponent: ViewCardRequest,
    //   enabled: true,
    //   permissions: [VIEW_CUSTOMER]
    // },
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

export const AuditTrailRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "audittrail",
      title: "Audit Trail",
      exact: false,
      icon: null,
      name: "AuditTrail",
      path: "/view-report",
      menu: true,
      pageComponent: AuditTrail,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
  ]
}

export const TransactionRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "transactionreport",
      title: "Transaction Report",
      exact: false,
      icon: null,
      name: "TransactionReport",
      path: "/view-transactions",
      menu: true,
      pageComponent: Transactions,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
  ]
}

export const TokenRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "channeltoken",
      title: "Channel Token",
      exact: false,
      icon: null,
      name: "ChannelToken",
      path: "/channel-token",
      menu: true,
      pageComponent: ChannelTokenForm,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
  ]
}

export const RolesRoutes = {
  enabled: true,
  menu: true,
  routes: [
    {
      key: "roles",
      title: "Roles",
      exact: true,
      icon: null,
      name: "roles",
      path: "/roles",
      menu: true,
      pageComponent: Roles,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
    {
      key: "addRole",
      title: "Add Role",
      exact: true,
      icon: null,
      name: "Add Roles",
      path: "/roles/add",
      menu: false,
      pageComponent: RoleForm,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
    {
      key: "editRole",
      title: "Update Role",
      exact: true,
      icon: null,
      name: "Update Role",
      path: "/roles/edit/:id",
      menu: false,
      pageComponent: RoleForm,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
    {
      key: "viewRole",
      title: "View Role",
      exact: true,
      icon: null,
      name: "View Role",
      path: "/roles/view/:id",
      menu: false,
      pageComponent: ViewRole,
      enabled: true,
      permissions: [VIEW_ADMIN]
    },
  ]
}


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
