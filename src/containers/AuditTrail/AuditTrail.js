import React from "react";
// import {useDispatch, useSelector} from "react-redux";
// import "../../../../src/assets/Styles/Dashboard.css";
// import AuditStatusBar from './AuditStatusBar';
// import { fetchAllTrail } from "../../../actions/OwnerActions/OwnerTrailMgtActions/OwnerTrailActions";
import AuditTrailList from "./AuditTrailList";

function AuditTrail (props) {

//   const dispatch = useDispatch();
//   const props = useSelector(state => state);
  return (
    <div className="dashboard-container">
      {/* <AuditStatusBar {...props} isVisible={true} /> */}
      <AuditTrailList {...props} />
      <h1>Audit Trail</h1>
    </div>
  )
}

export default AuditTrail;