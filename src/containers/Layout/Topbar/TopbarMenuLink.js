import React, { memo, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkChild = props => (
  <Fragment>
    <span className={`topbar__link-icon lnr`}>{props.icon({ size: 16 })}</span>
    <p className="topbar__link-title">{props.title}</p>
  </Fragment>
);

const TopbarMenuLinks = memo(props => {
  const { title, icon, path, external } = props;
  return (
    <Fragment>
      {external ? (
        <a href={path} className="topbar__link">
          <LinkChild icon={icon} title={title} />
        </a>
      ) : (
        <Link className="topbar__link" to={path}>
          <LinkChild icon={icon} title={title} />
        </Link>
      )}
    </Fragment>
  );
});

TopbarMenuLinks.proptypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default TopbarMenuLinks;
