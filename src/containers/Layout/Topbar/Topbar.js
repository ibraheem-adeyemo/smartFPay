import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TopbarSidebarButton from "./TopbarSidebarButton";
import TopbarProfile from "./TopbarProfile";
import TopbarNotification from "./TopbarNotification";

const Topbar = memo(props => {
  const { changeMobileSidebarVisibility, changeSidebarVisibility } = props;

  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <TopbarSidebarButton
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
            changeSidebarVisibility={changeSidebarVisibility}
          />
          <Link className="topbar__logo" to="/dashboard" />
        </div>
        <div className="topbar__right">
          <TopbarProfile />
        </div>
      </div>
    </div>
  );
});

Topbar.proptypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired
};

export default Topbar;
