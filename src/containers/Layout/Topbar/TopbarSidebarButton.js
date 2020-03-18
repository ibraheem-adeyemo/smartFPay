import React, { memo } from "react";
import PropTypes from "prop-types";
import { MdMenu } from "react-icons/md";

const TopbarSidebarButton = memo(props => {
  const { changeMobileSidebarVisibility, changeSidebarVisibility } = props;

  return (
    <div>
      <button
        type="button"
        className="topbar__button topbar__button--desktop"
        onClick={changeSidebarVisibility}
      >
        <MdMenu size={25} className="topbar__button-icon" />
      </button>
      <button
        type="button"
        className="topbar__button topbar__button--mobile"
        onClick={changeMobileSidebarVisibility}
      >
        <MdMenu size={25} className="topbar__button-icon" />
      </button>
    </div>
  );
});

TopbarSidebarButton.proptypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired
};

export default TopbarSidebarButton;
