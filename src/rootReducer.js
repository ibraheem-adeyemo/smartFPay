import { reducer as reduxFormReducer } from "redux-form";
import { combineReducers } from "redux";

import { sidebarReducer, themeReducer } from "./containers/Layout/reducers";
import { alert as notificationReducer } from "./containers/Notifications/reducers/alert.reducer";

import {postlogin} from "./containers/Account/reducers";

import {
  viewuser,
  postuser,
  getusers,
  toggleuser,
  editRole,
  getuserrole
} from "./containers/Users/reducers";

import {
  viewcontrol,
  postcontrol,
  postcardcontrol,
  getcontrols,
  toggleaccount,
  togglecard
} from "./containers/Limits/reducers"

import {
  getAllCardRequests,
  getCardRequest,
  getCardStatus,
  createCard
} from "./containers/CardRequests/reducers";

import { domains } from "./containers/Domains/reducers";
import { permissions, currentUser } from "./containers/CurrentUser/reducers";
import { roles, postrole } from "./containers/Roles/reducers";

import { cardProgramCount } from "./containers/Dashboard/reducers";

import { getCustomers, getCustomer } from "./containers/Customers/reducers";
import { getCardRecords, getCardRecord, pinReissue, blockCard, unblockCard } from "./containers/CardRecords/reducers";



export default combineReducers({
  form: reduxFormReducer,
  theme: themeReducer,
  sidebar: sidebarReducer,
  notification: notificationReducer,

  postlogin,

  viewuser,
  getusers,
  postuser,
  toggleuser,
  domains,
  permissions,
  currentUser,
  getuserrole,
  editRole,

  viewcontrol,
  getcontrols,
  toggleaccount,
  togglecard,
  postcontrol,
  postcardcontrol,

  roles,
  postrole,

  getAllCardRequests,
  getCardRequest,
  getCardStatus,
  createCard,


  getCustomers,
  getCustomer,
  
  getCardRecords,
  getCardRecord,
  
  pinReissue,
  blockCard,
  unblockCard,

  cardProgramCount
});
