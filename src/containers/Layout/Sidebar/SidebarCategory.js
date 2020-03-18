import React, { useState } from "react";
import { Collapse } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MdChevronRight } from "react-icons/md";

const SidebarCategory = props => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(prev => !prev);
  };

  const { title, icon, isNew, children, id } = props;

  const categoryClass = classNames({
    "sidebar__category-wrap": true,
    "sidebar__category-wrap--open": collapse
  });

  return (
    <div className={categoryClass}>
      <button
        id={id}
        name={id}
        type="button"
        className="sidebar__link sidebar__category"
        onClick={toggle}
      >
        {icon ? (
          <span className={`sidebar__link-icon lnr`}>{icon({ size: 16 })}</span>
        ) : (
          ""
        )}
        <p className="sidebar__link-title">
          {title}
          {isNew && <span className="sidebar__category-new" />}
        </p>
        <span className="sidebar__category-icon lnr">
          <MdChevronRight size={18} />
        </span>
      </button>
      <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>{children}</div>
        </ul>
      </Collapse>
    </div>
  );
};

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  isNew: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

SidebarCategory.defaultProps = {
  isNew: false
};

export default SidebarCategory;
