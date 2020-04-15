import { GoDashboard } from "react-icons/go";
import {
  MdAccountBalance,
  MdPersonAdd,
  MdCreditCard,
  MdPeople
} from "react-icons/md";
import { permissionsConstants } from "../../../constants/permissions.constants";

const {
  VIEW_USERS,
  VIEW_CONTROLS,
  VIEW_ADMIN,
  VIEW_CUSTOMER,
} = permissionsConstants;

export const menuConfig = {
  menus: [
    {
      categoryBlock: true,
      key: "dashboard",
      title: "Dashboard",
      icon: GoDashboard,
      path: "/dashboard",
      permissions: []
    },
    {
      title: "User Management",
      key: "user-management",
      path: "/users",
      permissions: [VIEW_USERS],
      icon: MdPersonAdd
    },
    {
      title: "Limits Requests",
      key: "limit-requests",
      icon: MdCreditCard,
      path: "/limit-requests",
      permissions: [VIEW_CONTROLS]
    },
    {
      title: "Customer Information",
      key: "customer-information",
      path: "/customers",
      permissions: [VIEW_CUSTOMER],
      icon: MdPeople
    },
    {
      category: true,
      title: "Admin Management",
      key: "admin-management",
      icon: MdAccountBalance,
      permissions: [VIEW_ADMIN],
      menus: [
        {
          title: "Roles Management",
          key: "roles-management",
          path: "/roles",
          permissions: [VIEW_ADMIN]
        },
        {
          title: "Audit Trail",
          key: "audit-trail",
          path: "/view-report",
          permissions: [VIEW_ADMIN]
        }
      ]
    }
  ]
};
