import React, { memo, useState } from "react";
import { connect } from "react-redux";

import { MdExpandMore, MdExitToApp } from "react-icons/md";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
// import { logoutUrl } from "../../../constants/app.constants";
import Avatar from "react-avatar";

const TopbarProfile = memo(props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(prev => !prev);
  };
  const { currentUser } = props;
  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={toggle}>
        {currentUser && currentUser.response ? (
          <div className="topbar__avatar-name">
            <Avatar
              round={true}
              size="32"
              className="mr-2"
              name={`${currentUser.response.firstName} ${currentUser.response.lastName}`}
            />
            {currentUser.response.firstName} {currentUser.response.lastName} (
            {currentUser.response.domainName})
          </div>
        ) : null}

        <MdExpandMore size={20} className="topbar__icon" />
      </button>
      {collapse && (
        <button type="button" className="topbar__back" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink
            external
            title="Log Out"
            icon={MdExitToApp}
            path="/login"
          />
        </div>
      </Collapse>
    </div>
  );
});

export default connect(state => ({
  currentUser: state.currentUser
}))(TopbarProfile);
