import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { menuConfig } from "./sidebarConfig";
// import { checkPermissions } from "../../../utils/accessControl";
import { connect } from "react-redux";

const SidebarContent = ({ onClick, permissions }) => {
  const hideSidebar = () => {
    onClick();
  };

  const renderSidebarLink = menu => (
    <Fragment key={menu.title}>
      {/* {checkPermissions(permissions, menu.permissions) && ( */}
        <SidebarLink
          id={menu.key}
          key={menu.key}
          title={menu.title}
          icon={menu.icon}
          route={menu.path}
          onClick={hideSidebar}
        />
      {/* )} */}
    </Fragment>
  );

  const renderSideBarCategory = menu => (
    <Fragment>
      {/* {checkPermissions(permissions, menu.permissions) && ( */}
        <SidebarCategory id={menu.key} title={menu.title} icon={menu.icon}>
          {menu.menus.map(submenu => renderSidebarLink(submenu))}
        </SidebarCategory>
      {/* )} */}
    </Fragment>
  );

  return (
    <div className="sidebar__content">
      {menuConfig.menus.map((menu, index) => (
        <Fragment key={index}>
          {menu.categoryBlock ? (
            <ul className="sidebar__block">
              {menu.category
                ? renderSideBarCategory(menu)
                : renderSidebarLink(menu)}
            </ul>
          ) : (
            <Fragment>
              {menu.category
                ? renderSideBarCategory(menu)
                : renderSidebarLink(menu)}
            </Fragment>
          )}
        </Fragment>
      ))}
      {/* <div>Powered By Interswitch</div> */}
    </div>
  );
};

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired
};

SidebarLink.defaultProps = {
  isNew: false
};

export default connect(state => ({
  permissions: state.permissions && state.permissions.response
}))(SidebarContent);
