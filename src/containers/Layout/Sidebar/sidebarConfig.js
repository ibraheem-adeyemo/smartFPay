import { GoDashboard } from "react-icons/go";
import {
  MdAccountBalance,
  MdPersonAdd,
  MdCreditCard,
  MdPeople,
  MdSettings,
  MdLockOutline,
  MdSwapHoriz
} from "react-icons/md";
// import {BiShieldQuarter} from 'react-icons/bi';
import {AiOutlineAudit} from "react-icons/ai";
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
      title: "Limits Management",
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
      title: "Audit Trail",
      key: "audit-trail",
      path: "/view-report",
      permissions: [VIEW_ADMIN],
      icon: AiOutlineAudit
    },
    {
      title: "Transactions",
      key: "transactions",
      path: "/view-transactions",
      permissions: [VIEW_ADMIN],
      icon: MdSwapHoriz
    },
    {
      title: "Channel Token",
      key: "channeltoken",
      path: "/channel-token",
      permissions: [VIEW_ADMIN],
      icon: MdLockOutline
    },
    {
      title: "Settings",
      key: "admin-management",
      icon: MdSettings,
      permissions: [VIEW_ADMIN],
      menus: [
        {
          title: "Roles Management",
          key: "roles-management",
          path: "/roles",
          permissions: [VIEW_ADMIN]
        },
      ]
    }
  ]
};
