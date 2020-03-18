import { MdCreditCard, MdPersonAdd, MdAssignment } from "react-icons/md";

export const dashboardConstants = {
  GET_CARDPROGRAM_COUNT_REQUEST: "GET_CARDPROGRAM_COUNT_REQUEST",
  GET_CARDPROGRAM_COUNT_SUCCESS: "GET_CARDPROGRAM_COUNT_SUCCESS",
  GET_CARDPROGRAM_COUNT_FAILURE: "GET_CARDPROGRAM_COUNT_FAILURE",
  GET_CARDPROGRAM_COUNT_RESET: "GET_CARDPROGRAM_COUNT_RESET"
};

export const quicklinks = [
  {
    path: "/create-limit",
    title: "Create limit",
    icon: MdCreditCard
  },
  {
    path: "/users/add",
    title: "Create User",
    icon: MdPersonAdd
  },
  {
    path: "/view-report",
    title: "View Report",
    icon: MdAssignment
  }
];
