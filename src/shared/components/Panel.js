/* eslint-disable react/prop-types */
import React, { memo, useState } from "react";
import { Badge, Card, CardBody, Col, Collapse } from "reactstrap";
import PropTypes from "prop-types";

import { MdClose, MdRefresh, MdRemove, MdCached } from "react-icons/md";

const AlertComponent = memo(props => {
  const [visible, setVisible] = useState(true);
  const [collapse, setCollapse] = useState(true);
  const [refresh, setRefresh] = useState(false);

  /* const onShow = () => {
    setVisible(true);
  }; */

  const onDismiss = () => {
    setVisible(false);
  };

  const onCollapse = () => {
    setCollapse(prev => !prev);
  };

  const onRefresh = () => {
    // your async logic here
    setRefresh(prev => !prev);
    setTimeout(() => setRefresh(false), 5000);
  };

  const {
    md,
    lg,
    xl,
    sm,
    xs,
    color,
    divider,
    icon,
    title,
    label,
    subhead,
    before,
    panelClass,
    children
  } = props;

  if (visible) {
    return (
      <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
        <Card
          className={`panel${color ? ` panel--${color}` : ""}
            ${divider ? " panel--divider" : ""}${
            collapse ? "" : " panel--collapse"
          } ${panelClass}`}
        >
          <CardBody className="panel__body">
            {refresh ? (
              <div className="panel__refresh">
                <MdCached />
              </div>
            ) : (
              ""
            )}
            <div className="panel__btns">
              <button className="panel__btn" type="button" onClick={onCollapse}>
                <MdRemove />
              </button>
              <button className="panel__btn" type="button" onClick={onRefresh}>
                <MdRefresh />
              </button>
              <button className="panel__btn" type="button" onClick={onDismiss}>
                <MdClose />
              </button>
            </div>
            <div className="panel__title">
              <h5 className="bold-text">
                {icon ? <span className={`panel__icon lnr lnr-${icon}`} /> : ""}
                {title}
                <Badge className="panel__label">{label}</Badge>
              </h5>
              <h5 className="subhead">{subhead}</h5>
            </div>
            <Collapse isOpen={collapse}>
              <div className="panel__content">{children}</div>
            </Collapse>
          </CardBody>
        </Card>
        {before}
      </Col>
    );
  }

  return "";
});

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">{title}</h5>
  </div>
);

export default AlertComponent;

AlertComponent.propTypes = {
  divider: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string,
  subhead: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  before: PropTypes.element,
  panelClass: PropTypes.string
};

AlertComponent.defaultProps = {
  divider: false,
  color: "",
  title: "",
  subhead: "",
  label: "",
  icon: "",
  md: 0,
  lg: 0,
  xl: 0,
  sm: 0,
  xs: 0,
  before: null,
  panelClass: ""
};
