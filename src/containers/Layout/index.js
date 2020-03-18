import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import { SidebarProps } from "../../shared/prop-types/ReducerProps";
import { changeThemeToDark, changeThemeToLight } from "./actions/themeActions";
import {
  changeMobileSidebarVisibility,
  changeSidebarVisibility
} from "./actions/sidebarActions";
import NotificationSystem from "rc-notification";
import { FullWideNotification } from "../../shared/components/Notification";

let notification = null;

const showNotification = notifications => {
  notification &&
    notification.notice({
      content: (
        <FullWideNotification
          color={notifications.type}
          message={`${notifications.title}: ${
            notifications.message ? notifications.message : ""
          }`}
        />
      ),
      key: "notification",
      duration: 3,
      maxCount: 1,
      closable: true,
      style: { top: 0, left: 0, textAlign: "center" },
      position: "full"
    });
};

const Layout = props => {
  const { sidebar, dispatch, notifications } = props;

  useEffect(() => {
    NotificationSystem.newInstance({}, n => (notification = n));
    return () => {
      notification && notification.destroy();
    };
  }, []);

  useEffect(() => {
    if (notifications.title) {
      showNotification(notifications);
    }
    return () => null;
  }, [notifications]);

  const layoutClass = classNames({
    layout: true,
    "layout--collapse": sidebar.collapse
  });

  const changeSidebarVisibilityFn = () => {
    dispatch(changeSidebarVisibility());
  };

  const changeMobileSidebarVisibilityFn = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  return (
    <div className={layoutClass}>
      <Topbar
        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFn}
        changeSidebarVisibility={changeSidebarVisibilityFn}
      />
      <Sidebar
        sidebar={sidebar}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeMobileSidebarVisibility={changeMobileSidebarVisibilityFn}
        changeSidebarVisibility={changeSidebarVisibilityFn}
      />
    </div>
  );
};

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebar: SidebarProps.isRequired
};

export default withRouter(
  connect(state => ({
    sidebar: state.sidebar,
    notifications: state.notification
  }))(Layout)
);
