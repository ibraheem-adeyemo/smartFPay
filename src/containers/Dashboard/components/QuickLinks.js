import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Panel from "../../../shared/components/Panel";
import { quicklinks } from "../constants/dashboard.constants";

const QuickLinks = () => (
  <Panel lg={5} xl={6} md={12} xs={12} title="Quick Links">
    <Row>
      {quicklinks.map((link, index) => (
        <Col xl={6} key={index}>
          <Link className="dashboard__competitor" to={link.path}>
            <div className="dashboard__competitor-icon">
              {link.icon({ size: 20 })}
            </div>
            <div className="dashboard__competitor-info">
              <h5 className="dashboard__competitor-name">{link.title}</h5>
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  </Panel>
);

export default QuickLinks;
