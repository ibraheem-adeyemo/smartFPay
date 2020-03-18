import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ title, icon, newLink, route, onClick, id }) => (
  <NavLink
    to={route}
    id={id}
    name={id}
    onClick={onClick}
    activeClassName="sidebar__link-active"
  >
    <li className="sidebar__link">
      {icon ? (
        <span className={`sidebar__link-icon lnr`}>{icon({ size: 20 })}</span>
      ) : (
        ""
      )}
      <p className="sidebar__link-title">
        {title}
        {newLink ? (
          <Badge className="sidebar__link-badge">
            <span>New</span>
          </Badge>
        ) : (
          ""
        )}
      </p>
    </li>
  </NavLink>
);

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func
};

SidebarLink.defaultProps = {
  newLink: false,
  route: "/",
  onClick: () => {}
};

export default SidebarLink;
