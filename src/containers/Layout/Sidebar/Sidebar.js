import React from "react";
import Scrollbar from "react-smooth-scrollbar";
import classNames from "classnames";
import PropTypes from "prop-types";
import SidebarContent from "./SidebarContent";
import ThemeSwitch from "./ThemeSwitch";
import { SidebarProps } from "../../../shared/prop-types/ReducerProps";

const Sidebar = ({
  changeToDark,
  changeToLight,
  changeMobileSidebarVisibility,
  sidebar
}) => {
  const sidebarClass = classNames({
    sidebar: true,
    "sidebar--show": sidebar.show,
    "sidebar--collapse": sidebar.collapse
  });

  return (
    <div className={sidebarClass}>
      <button
        type="button"
        className="sidebar__back"
        onClick={changeMobileSidebarVisibility}
      />
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent onClick={() => {}} />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent onClick={changeMobileSidebarVisibility} />
        </div>
      </Scrollbar>
      <ThemeSwitch changeToDark={changeToDark} changeToLight={changeToLight} />
    </div>
  );
};

Sidebar.propTypes = {
  sidebar: SidebarProps.isRequired,
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  changeMobileSidebarVisibility: PropTypes.func.isRequired
};

export default Sidebar;
