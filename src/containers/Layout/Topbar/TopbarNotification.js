/* eslint-disable react/no-array-index-key */
import React, { memo, useState, Fragment } from "react";
import { Collapse } from "reactstrap";
// import { Link } from "react-router-dom";
import { MdNotifications } from "react-icons/md";

const notifications = [
  
];

const TopbarNotification = memo(props => {
  const [collapse, setCollapse] = useState(false);
  const { newItem } = props;
  const hasNotifications = notifications && notifications.length;
  const toggle = () => {
    setCollapse(prev => !prev);
  };

  return (
    <div className="topbar__collapse">
      <button
        className={`topbar__btn ${newItem ? `topbar__btn--new` : ""}`}
        type="button"
        onClick={toggle}
      >
        <MdNotifications />
        <div className="topbar__btn-new-label">
          <div />
        </div>
      </button>
      {collapse && (
        <button className="topbar__back" type="button" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__collapse-content">
        <div className="topbar__collapse-title-wrap">
          <p className="topbar__collapse-title">Notifications</p>
          {hasNotifications ? (
            <button className="topbar__collapse-button" type="button">
              Mark all as read
            </button>
          ) : (
            ""
          )}
        </div>
        <Fragment>
          {hasNotifications ? (
            <Fragment>
              {notifications.map((notification, index) => (
                <div className="topbar__collapse-item" key={index}>
                  <div className="topbar__collapse-img-wrap">
                    <img
                      className="topbar__collapse-img"
                      src={notification.ava}
                      alt=""
                    />
                  </div>
                  <p className="topbar__collapse-message">
                    <span className="topbar__collapse-name">
                      {notification.name}
                    </span>
                    {notification.message}
                  </p>
                  <p className="topbar__collapse-date">{notification.date}</p>
                </div>
              ))}
            </Fragment>
          ) : (
            <div className="topbar__collapse-item">
              <p className="topbar__collapse-message">No new notifications</p>
            </div>
          )}
        </Fragment>

        {/*  <Link
          className="topbar__collapse-link"
          to="/dashboard_default"
          onClick={toggle}
        >
          See all notifications
        </Link> */}
      </Collapse>
    </div>
  );
});

export default TopbarNotification;
